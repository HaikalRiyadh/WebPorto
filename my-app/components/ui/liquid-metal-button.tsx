"use client";

import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { Sparkles } from "lucide-react";
import type React from "react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const MAX_ACTIVE_WEBGL_SHADERS = 4;
let activeWebGLShaderCount = 0;

interface ShaderHandle {
  destroy?: () => void;
  setSpeed?: (speed: number) => void;
}

export interface LiquidMetalButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  viewMode?: "text" | "icon";
  size?: "sm" | "md" | "lg" | "icon";
  shaderMode?: "auto" | "webgl" | "css";
  href?: string;
  target?: string;
  rel?: string;
  fullWidth?: boolean;
}

const SIZE_CLASSES: Record<NonNullable<LiquidMetalButtonProps["size"]>, string> = {
  sm: "px-3.5 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-sm",
  icon: "w-[42px] h-[42px] p-0",
};

/**
 * Animated metallic liquid border button backed by @paper-design/shaders WebGL
 * within an active context budget, with a seamless GPU conic-gradient CSS fallback
 * for offscreen/reduced-motion/overflow instances.
 */
export const LiquidMetalButton = forwardRef<HTMLButtonElement, LiquidMetalButtonProps>(
  function LiquidMetalButton(
    {
      label = "Get Started",
      children,
      icon,
      viewMode = "text",
      size,
      shaderMode = "auto",
      href,
      target,
      rel,
      fullWidth = false,
      className,
      disabled = false,
      type = "button",
      onClick,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      ...rest
    },
    forwardedRef,
  ) {
    const resolvedSize: NonNullable<LiquidMetalButtonProps["size"]> =
      size ?? (viewMode === "icon" ? "icon" : "md");

    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [inView, setInView] = useState(true);
    const [tabVisible, setTabVisible] = useState(true);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

    const rootRef = useRef<HTMLDivElement>(null);
    const cssLayerRef = useRef<HTMLSpanElement>(null);
    const shaderRef = useRef<HTMLSpanElement>(null);
    const shaderMount = useRef<ShaderHandle | null>(null);
    const hasSlotRef = useRef(false);
    const isHoveredRef = useRef(false);
    const rippleId = useRef(0);
    const timeoutsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

    const scheduleTimeout = (fn: () => void, delayMs: number) => {
      const id = setTimeout(() => {
        timeoutsRef.current.delete(id);
        fn();
      }, delayMs);
      timeoutsRef.current.add(id);
    };

    useEffect(() => {
      const currentTimeouts = timeoutsRef.current;
      return () => {
        currentTimeouts.forEach((id) => clearTimeout(id));
        currentTimeouts.clear();
      };
    }, []);

    useEffect(() => {
      const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
      if (!mql) return;
      const syncMotion = () => setPrefersReducedMotion(mql.matches);
      const raf = requestAnimationFrame(syncMotion);
      mql.addEventListener("change", syncMotion);
      return () => {
        cancelAnimationFrame(raf);
        mql.removeEventListener("change", syncMotion);
      };
    }, []);

    useEffect(() => {
      const node = rootRef.current;
      if (!node || typeof IntersectionObserver === "undefined") return;
      const io = new IntersectionObserver(
        (entries) => {
          setInView(Boolean(entries[0]?.isIntersecting));
        },
        { rootMargin: "120px" },
      );
      io.observe(node);
      return () => io.disconnect();
    }, []);

    useEffect(() => {
      const handleVisibilityChange = () => {
        setTabVisible(document.visibilityState === "visible");
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    useEffect(() => {
      const setLayerState = (isShaderLive: boolean) => {
        if (shaderRef.current) {
          shaderRef.current.style.opacity = isShaderLive ? "1" : "0";
        }
        if (cssLayerRef.current) {
          cssLayerRef.current.classList.toggle(
            "liquid-metal-paused",
            !inView || !tabVisible || prefersReducedMotion || isShaderLive,
          );
        }
      };

      const releaseShader = () => {
        if (shaderMount.current?.destroy) {
          shaderMount.current.destroy();
          shaderMount.current = null;
        }
        if (hasSlotRef.current) {
          activeWebGLShaderCount = Math.max(0, activeWebGLShaderCount - 1);
          hasSlotRef.current = false;
        }
        setLayerState(false);
      };

      const wantsWebGL =
        shaderMode !== "css" &&
        inView &&
        tabVisible &&
        !prefersReducedMotion &&
        (shaderMode === "webgl" || activeWebGLShaderCount < MAX_ACTIVE_WEBGL_SHADERS);

      if (!wantsWebGL || !shaderRef.current) {
        releaseShader();
        return;
      }

      if (!hasSlotRef.current) {
        activeWebGLShaderCount += 1;
        hasSlotRef.current = true;
      }

      try {
        shaderMount.current = new ShaderMount(
          shaderRef.current,
          liquidMetalFragmentShader,
          {
            u_repetition: 4,
            u_softness: 0.5,
            u_shiftRed: 0.3,
            u_shiftBlue: 0.3,
            u_distortion: 0,
            u_contour: 0,
            u_angle: 45,
            u_scale: 8,
            u_shape: 1,
            u_offsetX: 0.1,
            u_offsetY: -0.1,
          },
          undefined,
          0.6,
        );
        setLayerState(true);
      } catch {
        releaseShader();
      }

      let resizeObserver: ResizeObserver | null = null;
      if (typeof ResizeObserver !== "undefined" && shaderRef.current) {
        resizeObserver = new ResizeObserver(() => {
          const mountWithResize = shaderMount.current as (ShaderHandle & {
            handleResize?: () => void;
          }) | null;
          mountWithResize?.handleResize?.();
        });
        resizeObserver.observe(shaderRef.current);
      }

      return () => {
        resizeObserver?.disconnect();
        releaseShader();
      };
    }, [inView, tabVisible, prefersReducedMotion, shaderMode]);

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      isHoveredRef.current = true;
      setIsHovered(true);
      shaderMount.current?.setSpeed?.(1);
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      isHoveredRef.current = false;
      setIsHovered(false);
      setIsPressed(false);
      shaderMount.current?.setSpeed?.(0.6);
      onMouseLeave?.(e);
    };

    const triggerInteraction = (clientX: number, clientY: number, rect: DOMRect) => {
      if (disabled) return;
      if (shaderMount.current?.setSpeed) {
        shaderMount.current.setSpeed(2.4);
        scheduleTimeout(() => {
          shaderMount.current?.setSpeed?.(isHoveredRef.current ? 1 : 0.6);
        }, 300);
      }

      const x = clientX === 0 && clientY === 0 ? rect.width / 2 : clientX - rect.left;
      const y = clientX === 0 && clientY === 0 ? rect.height / 2 : clientY - rect.top;
      const id = rippleId.current++;
      setRipples((prev) => [...prev, { x, y, id }]);
      scheduleTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    };

    const contentNode =
      children ??
      (viewMode === "icon" ? (
        icon ?? <Sparkles size={16} className="shrink-0 text-zinc-200" />
      ) : (
        <span className="inline-flex items-center gap-2 whitespace-nowrap">
          {icon}
          <span>{label}</span>
        </span>
      ));

    const sharedWrapperStyle: React.CSSProperties = {
      perspective: "1000px",
    };

    const outerPillClasses = cn(
      "group relative inline-flex items-center justify-center rounded-full p-[2px] overflow-hidden isolate select-none transition-all duration-300",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/85 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
      disabled && "opacity-75 pointer-events-none cursor-not-allowed",
      isPressed ? "translate-y-[1px] scale-[0.98]" : isHovered ? "-translate-y-[1.5px] scale-[1.02]" : "",
      fullWidth && "w-full",
      className,
    );

    const innerCoreClasses = cn(
      "relative z-20 flex items-center justify-center gap-2 rounded-full w-full h-full font-medium transition-colors duration-200",
      "text-zinc-200 group-hover:text-white",
      SIZE_CLASSES[resolvedSize],
    );

    const innerElements = (
      <>
        {/* Pure CSS conic-gradient fallback / active ring */}
        <span
          ref={cssLayerRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full overflow-hidden z-[5] liquid-metal-css-bg"
        />
        {/* Paper Design WebGL shader layer when slot active */}
        <span
          ref={shaderRef}
          aria-hidden="true"
          className="liquid-shader-mount pointer-events-none absolute inset-0 rounded-full overflow-hidden z-10 opacity-0 transition-opacity duration-300"
        />
        {/* Specular rim bevel */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full z-[15] ring-1 ring-inset ring-white/25 group-hover:ring-white/50 transition-all duration-200"
        />
        {/* Dark core container */}
        <span
          className={innerCoreClasses}
          style={{
            background: "linear-gradient(180deg, #222222 0%, #000000 100%)",
            boxShadow: isPressed
              ? "inset 0px 2px 4px rgba(0, 0, 0, 0.7), inset 0px 1px 2px rgba(0, 0, 0, 0.45)"
              : "none",
            textShadow: "0px 1px 2px rgba(0, 0, 0, 0.85)",
          }}
        >
          {contentNode}
        </span>
        {/* Ripples */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            aria-hidden="true"
            className="pointer-events-none absolute z-30 h-5 w-5 rounded-full"
            style={{
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
              background:
                "radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 70%)",
              animation: "liquid-ripple-expand 0.6s ease-out forwards",
            }}
          />
        ))}
      </>
    );

    const resolvedRel =
      rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);

    return (
      <div
        ref={rootRef}
        className={cn("relative inline-flex", fullWidth && "w-full")}
        style={sharedWrapperStyle}
      >
        {href ? (
          <a
            href={disabled ? undefined : href}
            target={target}
            rel={resolvedRel}
            aria-disabled={disabled || undefined}
            tabIndex={disabled ? -1 : rest.tabIndex}
            aria-label={rest["aria-label"] ?? (typeof label === "string" ? label : undefined)}
            className={outerPillClasses}
            onMouseEnter={() => {
              isHoveredRef.current = true;
              setIsHovered(true);
              shaderMount.current?.setSpeed?.(1);
            }}
            onMouseLeave={() => {
              isHoveredRef.current = false;
              setIsHovered(false);
              setIsPressed(false);
              shaderMount.current?.setSpeed?.(0.6);
            }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onClick={(e) => {
              if (disabled) {
                e.preventDefault();
                return;
              }
              triggerInteraction(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
              onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
            }}
          >
            {innerElements}
          </a>
        ) : (
          <button
            ref={forwardedRef}
            type={type}
            disabled={disabled}
            aria-label={rest["aria-label"] ?? (typeof label === "string" ? label : undefined)}
            className={outerPillClasses}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={(e) => {
              setIsPressed(true);
              onMouseDown?.(e);
            }}
            onMouseUp={(e) => {
              setIsPressed(false);
              onMouseUp?.(e);
            }}
            onClick={(e) => {
              triggerInteraction(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
              onClick?.(e);
            }}
            {...rest}
          >
            {innerElements}
          </button>
        )}
      </div>
    );
  },
);
