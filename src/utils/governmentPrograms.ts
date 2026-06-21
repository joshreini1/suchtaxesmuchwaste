
import { Program } from '../types/calculator';

export const governmentPrograms: Program[] = [
  {
    id: "defense",
    name: "Defense & Military",
    percentage: 0.20,
    description: "Military operations, equipment, and personnel",
    icon: "shield",
    department: "Department of Defense",
    color: "#4C51BF"
  },
  {
    id: "social-security",
    name: "Social Security",
    percentage: 0.30,
    description: "Retirement and disability benefits",
    icon: "users",
    department: "Social Security Administration",
    color: "#38B2AC"
  },
  {
    id: "medicare",
    name: "Medicare & Healthcare",
    percentage: 0.33,
    description: "Federal healthcare programs and services",
    icon: "heart",
    department: "Department of Health & Human Services",
    color: "#ED64A6"
  },
  {
    id: "income-security",
    name: "Income Security",
    percentage: 0.17,
    description: "Unemployment, food/housing assistance",
    icon: "home",
    department: "Department of Labor & HUD",
    color: "#F6AD55"
  }
];
