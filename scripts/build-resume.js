const PDFDocument = require("pdfkit");
const fs = require("fs");

// ==== EDIT YOUR DETAILS HERE ====
const PHONE_NUMBER = "[PHONE NUMBER]";
const CERTIFICATIONS = "[CERTIFICATIONS - TO BE ADDED]";
// =================================

const doc = new PDFDocument({ size: "A4", margin: 50 });
doc.pipe(fs.createWriteStream("public/Fatima_Shaikh_Resume.pdf"));

const primary = "#1F3A5F";
const secondary = "#5B5D66";
const dark = "#14151A";

function heading(text) {
  doc.moveDown(0.6);
  doc.fillColor(primary).fontSize(12).font("Helvetica-Bold").text(text.toUpperCase());
  doc.moveTo(doc.x, doc.y + 2).lineTo(545, doc.y + 2).strokeColor(primary).lineWidth(1).stroke();
  doc.moveDown(0.4);
  doc.fillColor(dark);
}

function bullet(text) {
  doc.fontSize(10).font("Helvetica").fillColor(dark);
  doc.text("-  " + text, { indent: 10, align: "left" });
}

function jobHeader(role, org, dates) {
  doc.fontSize(11).font("Helvetica-Bold").fillColor(dark).text(role + " - " + org, { continued: false });
  doc.fontSize(9).font("Helvetica-Oblique").fillColor(secondary).text(dates);
  doc.moveDown(0.15);
}

function projectHeader(name, stack) {
  doc.fontSize(11).font("Helvetica-Bold").fillColor(dark).text(name);
  doc.fontSize(9).font("Helvetica-Oblique").fillColor(secondary).text(stack);
  doc.moveDown(0.15);
}

// Name
doc.fontSize(24).font("Helvetica-Bold").fillColor(dark).text("FATIMA SHAIKH");
doc.fontSize(12).font("Helvetica").fillColor(primary).text("Software Engineer - Backend, Data Engineering & AI");
doc.moveDown(0.3);
doc.fontSize(9.5).fillColor(dark).text(
  "fshaikhh15@gmail.com  |  " + PHONE_NUMBER + "  |  github.com/Fatimshaikh  |  linkedin.com/in/fatima-shaikh"
);

heading("Summary");
doc.fontSize(10).font("Helvetica").text(
  "Software Engineer with a BS in Software Engineering, building hands-on across backend systems, data engineering, and AI-driven applications. Experience designing and deploying end-to-end systems - REST APIs, streaming and batch data pipelines, and LLM-integrated applications - using FastAPI, Kafka, Flink, dbt, Airflow, Docker, and Kubernetes."
);

heading("Technical Skills");
doc.fontSize(10);
doc.font("Helvetica-Bold").text("Backend: ", { continued: true }).font("Helvetica").text("FastAPI, Django, PostgreSQL, SQLAlchemy, REST APIs, JWT Authentication");
doc.font("Helvetica-Bold").text("Data Engineering: ", { continued: true }).font("Helvetica").text("Kafka, Apache Flink, PySpark, dbt, Airflow, Dagster, Delta Lake, Debezium (CDC)");
doc.font("Helvetica-Bold").text("AI: ", { continued: true }).font("Helvetica").text("LLM-integrated applications, AI agents, Groq, Google Gemini AI, n8n automation");
doc.font("Helvetica-Bold").text("Infrastructure: ", { continued: true }).font("Helvetica").text("Docker, Kubernetes, Jenkins, GitHub Actions, CI/CD");
doc.font("Helvetica-Bold").text("Databases: ", { continued: true }).font("Helvetica").text("PostgreSQL, MongoDB, Redis, DuckDB");

heading("Experience");
jobHeader("Backend & AI Engineering Intern", "FlyRank", "July 2026 - August 2026");
bullet("Backend and AI engineering track, building hands-on fluency across backend systems and applied AI engineering.");
doc.moveDown(0.3);
jobHeader("Web Developer Intern", "Symits", "2024");
bullet("Web development internship, building hands-on experience with real-world web projects.");

heading("Selected Projects");

projectHeader("E-commerce CDC Lakehouse", "PostgreSQL, Debezium, Kafka, Delta Lake, dbt, Airflow, Kubernetes");
bullet("Built a production-style CDC data platform capturing live database changes, streaming through Kafka into a Delta Lake Bronze/Silver/Gold lakehouse.");
bullet("Orchestrated the pipeline with Airflow and a custom data quality gate; deployed 5 of 7 services to Kubernetes with a Jenkins CI/CD pipeline.");
doc.moveDown(0.3);

projectHeader("Flink Kafka Streaming", "Kafka, Apache Flink, WebSocket, React, Docker");
bullet("Built a real-time stream processing pipeline with a live Apache Flink cluster performing windowed aggregations over Kafka event streams.");
bullet("Bridged results to a browser dashboard in real time via a FastAPI WebSocket service.");
doc.moveDown(0.3);

projectHeader("Finance PII Scrubber", "FastAPI, PostgreSQL, Groq");
bullet("Built a FastAPI service that scrubs PII from financial statements using combined regex and label-based detection across multiple file formats.");
bullet("Generated AI budgeting analysis via Groq, paired with an independent non-AI ground-truth calculator to verify totals.");

heading("Education");
doc.fontSize(11).font("Helvetica-Bold").fillColor(dark).text("BS Software Engineering");
doc.fontSize(10).font("Helvetica").fillColor(secondary).text("Usman Institute of Technology (NED Affiliated)");

heading("Certifications");
doc.fontSize(10).font("Helvetica-Oblique").fillColor(secondary).text(CERTIFICATIONS);

doc.end();
console.log("Resume created at public/Fatima_Shaikh_Resume.pdf");
