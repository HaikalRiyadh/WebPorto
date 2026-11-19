import React from "react";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";

const testimonials = [
  {
    quote:
      "A web-based pharmacy management system automating medicine inventory, POS transactions, digital prescriptions, and periodic profit/loss reports. Features secure role-based access control for cashiers and administrators.",
    name: "Apotek Management System",
    designation: "Full-Stack Web Engineering • Laravel, Livewire & MySQL",
    src: "./Images/Apotek.png",
    repository: "https://github.com/HaikalRiyadh/Apotek-System",
    technologies: ["Laravel", "Livewire", "MySQL", "Tailwind CSS"],
  },
  {
    quote:
      "A collaborative project management mobile app built on Agile Scrum methodology with Flutter and a PHP/MySQL backend. Features interactive Kanban boards, sprint burndown tracking, real-time task notifications, and team governance.",
    name: "Scrum Collaboration App",
    designation: "Cross-Platform Mobile Architecture • Flutter & Dart",
    src: "./Images/Scrum.png",
    repository: "https://github.com/HaikalRiyadh/Manajemen-kolaborasi-Scrum",
    technologies: ["Flutter", "Dart", "PHP REST API", "MySQL"],
  },
  {
    quote:
      "A web-based motorcycle spare parts inventory and POS system managing stock turnover, customer transaction invoices, and an accurate, transparent financial analytics dashboard.",
    name: "Shop Management System | 28Speedshop",
    designation: "Inventory & POS System • PHP & MySQL",
    src: "./Images/Shop.png",
    repository: "https://github.com/HaikalRiyadh/28speedshop",
    technologies: ["PHP", "MySQL", "JavaScript", "CSS3"],
  },
  {
    quote:
      "An offline-first mobile financial tracking app featuring high-speed local SQLite persistence, rapid catalog synchronization, and a reactive interface built with React Native & TypeScript.",
    name: "1Money Financial Apps",
    designation: "Offline-First Mobile Architecture • Expo & SQLite",
    src: "./Images/1money.png",
    repository: "https://github.com/HaikalRiyadh/1money",
    technologies: ["TypeScript", "Expo", "SQLite", "React Native"],
  },
  {
    quote:
      "An integrated enterprise HR platform facilitating personnel administration, tiered leave approvals, KPI performance evaluations, and automated payroll calculations with multi-level role authentication.",
    name: "Human Resource Information System (HRIS)",
    designation: "Enterprise Enterprise Platform • Laravel Full-Stack",
    src: "./Images/Hris.png",
    repository: "https://github.com/HaikalRiyadh/HRIS",
    technologies: ["Laravel Blade", "JavaScript", "MySQL", "Tailwind CSS"],
  },
];

export const CircularTestimonialsDemo = () => (
  <section className="w-full">
    {/* Dark projects showcase */}
    <div className="bg-[#060507] p-8 sm:p-16 rounded-2xl min-h-[400px] flex flex-wrap gap-6 items-center justify-center relative">
      <div
        className="items-center justify-center relative flex w-full"
        style={{ maxWidth: "1024px" }}
      >
        <CircularTestimonials
          testimonials={testimonials}
          autoplay={true}
          colors={{
            name: "#f7f7ff",
            designation: "#38bdf8",
            testimony: "#cbd5e1",
            arrowBackground: "#0891b2",
            arrowForeground: "#ffffff",
            arrowHoverBackground: "#06b6d4",
          }}
          fontSizes={{
            name: "28px",
            designation: "16px",
            quote: "18px",
          }}
        />
      </div>
    </div>
  </section>
);

export default CircularTestimonialsDemo;
