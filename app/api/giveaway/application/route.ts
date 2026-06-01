import { NextResponse } from "next/server"
import { Resend } from "resend"
import { giveawayApplicationSchema } from "@/lib/validations/giveaway-application"
import {
  generateApplicationEmailHtml,
  generateApplicationEmailText,
  generateConfirmationEmailHtml,
  generateConfirmationEmailText,
} from "@/lib/email-templates/giveaway-application"

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY)

// TODO: Rate limiting placeholder
// In production, implement rate limiting using Redis, Upstash, or similar
// Example: Limit to 5 submissions per IP per hour
// const rateLimiter = ...

export async function POST(request: Request) {
  try {
    // Parse JSON body
    const body = await request.json()

    // Honeypot check - if the hidden field has a value, it's likely a bot
    // Silently return success to avoid giving bots feedback
    if (body.websiteConfirm && body.websiteConfirm.length > 0) {
      return NextResponse.json(
        { success: true, message: "Application received" },
        { status: 200 }
      )
    }

    // Validate request body using shared Zod schema
    const validationResult = giveawayApplicationSchema.safeParse(body)

    if (!validationResult.success) {
      const errors = validationResult.error.flatten()
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: errors.fieldErrors,
        },
        { status: 400 }
      )
    }

    const validatedData = validationResult.data

    // Generate email content
    const emailHtml = generateApplicationEmailHtml(validatedData)
    const emailText = generateApplicationEmailText(validatedData)

    // Send email to owner via Resend
    const { error: emailError } = await resend.emails.send({
      // TODO: Update this 'from' address once your domain is verified in Resend
      // Currently using Resend's default onboarding address
      // After verifying your domain, change to: "Built By Gio <applications@builtbygio.com>"
      from: "Built By Gio <hello@workwithgio.com>",
      to: "rob.gioeli@echelongrowthgroup.com",
      subject: `New Free Website Giveaway Application - ${validatedData.businessName}`,
      html: emailHtml,
      text: emailText,
    })

    if (emailError) {
      console.error("[API] Failed to send email:", emailError)
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send application. Please try again.",
        },
        { status: 500 }
      )
    }

    // Send confirmation email to applicant
    console.log("[v0] Sending confirmation email to:", validatedData.email)
    
    const confirmationHtml = generateConfirmationEmailHtml({
      fullName: validatedData.fullName,
      businessName: validatedData.businessName,
      selectedPlan: validatedData.selectedPlan,
    })
    const confirmationText = generateConfirmationEmailText({
      fullName: validatedData.fullName,
      businessName: validatedData.businessName,
      selectedPlan: validatedData.selectedPlan,
    })

    const { data: confirmationData, error: confirmationError } = await resend.emails.send({
      from: "Built By Gio <hello@workwithgio.com>",
      to: validatedData.email,
      subject: `Application Received - Built By Gio Free Website Giveaway`,
      html: confirmationHtml,
      text: confirmationText,
    })

    if (confirmationError) {
      // Log the full error details
      console.error("[v0] Failed to send confirmation email:", JSON.stringify(confirmationError, null, 2))
    } else {
      console.log("[v0] Confirmation email sent successfully. Email ID:", confirmationData?.id)
    }

    // TODO: Database placeholder
    // In production, save the application to a database
    // Example: await db.insert(applications).values(validatedData)

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[API] Unexpected error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    )
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    { success: false, message: "Method not allowed" },
    { status: 405 }
  )
}
