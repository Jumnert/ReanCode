// Email Service
import nodemailer from "nodemailer";
import { env } from "@/config/env";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: parseInt(env.SMTP_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export class EmailService {
  static async send(options: EmailOptions) {
    try {
      const info = await transporter.sendMail({
        from: `"Learning Platform" <${env.EMAIL_FROM}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || "",
      });

      console.log("Email sent:", info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error("Email error:", error);
      return { success: false, error };
    }
  }

  // Welcome email
  static async sendWelcome(email: string, name: string) {
    return this.send({
      to: email,
      subject: "Welcome to Learning Platform!",
      html: `
        <h1>Welcome, ${name}!</h1>
        <p>Thanks for joining our learning platform.</p>
        <p>Start your learning journey today!</p>
        <a href="${env.NEXT_PUBLIC_APP_URL}/learn">Explore Courses</a>
      `,
    });
  }

  // Email verification
  static async sendVerification(email: string, token: string) {
    const verifyUrl = `${env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`;

    return this.send({
      to: email,
      subject: "Verify your email",
      html: `
        <h1>Email Verification</h1>
        <p>Click the link below to verify your email address:</p>
        <a href="${verifyUrl}">Verify Email</a>
        <p>Or copy this link: ${verifyUrl}</p>
        <p>This link expires in 24 hours.</p>
      `,
    });
  }

  // Password reset
  static async sendPasswordReset(email: string, token: string) {
    const resetUrl = `${env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;

    return this.send({
      to: email,
      subject: "Reset your password",
      html: `
        <h1>Password Reset</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>Or copy this link: ${resetUrl}</p>
        <p>This link expires in 1 hour.</p>
        <p>If you didn't request this, ignore this email.</p>
      `,
    });
  }

  // Course completion
  static async sendCourseCompletion(email: string, courseName: string) {
    return this.send({
      to: email,
      subject: `Congrats! You completed ${courseName}`,
      html: `
        <h1>🎉 Congratulations!</h1>
        <p>You've completed the <strong>${courseName}</strong> course!</p>
        <p>Keep up the great work!</p>
        <a href="${env.NEXT_PUBLIC_APP_URL}/dashboard">View Your Progress</a>
      `,
    });
  }

  // Weekly progress report
  static async sendWeeklyReport(
    email: string,
    stats: {
      lessonsCompleted: number;
      timeSpent: number;
      streak: number;
    }
  ) {
    return this.send({
      to: email,
      subject: "Your Weekly Learning Report",
      html: `
        <h1>Your Week in Learning</h1>
        <ul>
          <li>Lessons completed: ${stats.lessonsCompleted}</li>
          <li>Time spent: ${Math.round(stats.timeSpent / 60)} minutes</li>
          <li>Current streak: ${stats.streak} days</li>
        </ul>
        <p>Keep it up!</p>
        <a href="${env.NEXT_PUBLIC_APP_URL}/dashboard">View Dashboard</a>
      `,
    });
  }

  // Achievement unlocked
  static async sendAchievement(
    email: string,
    achievement: {
      title: string;
      description: string;
      icon: string;
    }
  ) {
    return this.send({
      to: email,
      subject: `Achievement Unlocked: ${achievement.title}`,
      html: `
        <h1>🏆 Achievement Unlocked!</h1>
        <h2>${achievement.icon} ${achievement.title}</h2>
        <p>${achievement.description}</p>
        <a href="${env.NEXT_PUBLIC_APP_URL}/profile">View Achievements</a>
      `,
    });
  }
}

export default EmailService;
