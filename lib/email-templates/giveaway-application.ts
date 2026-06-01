import type { GiveawayApplicationData, PlanId } from "@/lib/validations/giveaway-application"
import {
  servicePlans,
  businessTypes,
  businessChallenges,
  websiteGoals,
  addOnServices,
  calculateMonthlyTotal,
} from "@/lib/validations/giveaway-application"

// HTML escape function to prevent XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (char) => map[char] || char)
}

function getBusinessTypeLabel(value: string): string {
  const found = businessTypes.find(b => b.value === value)
  return found?.label || value
}

function getChallengeLabel(value: string): string {
  const found = businessChallenges.find(c => c.value === value)
  return found?.label || value
}

function getGoalLabel(value: string): string {
  const found = websiteGoals.find(g => g.value === value)
  return found?.label || value
}

function getAddOnLabel(id: string): string {
  const found = addOnServices.find(a => a.id === id)
  return found?.label || id
}

function getPlanName(planId: PlanId): string {
  const plan = servicePlans.find(p => p.id === planId)
  return plan?.name || planId
}

export function generateApplicationEmailHtml(
  data: Omit<GiveawayApplicationData, "websiteConfirm" | "termsAccepted"> & { termsAccepted: boolean }
): string {
  const e = escapeHtml
  const monthlyTotal = calculateMonthlyTotal(data.selectedPlan)
  const plan = servicePlans.find(p => p.id === data.selectedPlan)
  const hasAddOns = data.selectedAddOns && data.selectedAddOns.length > 0

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Free Website Giveaway Application</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #dc2626; padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                New Free Website Giveaway Application
              </h1>
              <p style="margin: 12px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">
                A new local business has applied for the Built By Gio free website giveaway.
              </p>
            </td>
          </tr>
          
          <!-- Business Name & Plan Highlight -->
          <tr>
            <td style="padding: 32px 40px 24px 40px; text-align: center; border-bottom: 1px solid #e5e5e5;">
              <p style="margin: 0 0 8px 0; color: #737373; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
                Business Name
              </p>
              <h2 style="margin: 0 0 16px 0; color: #171717; font-size: 28px; font-weight: 700;">
                ${e(data.businessName)}
              </h2>
              <div style="display: inline-block; background-color: ${plan?.color === 'green' ? '#22c55e' : plan?.color === 'blue' ? '#3b82f6' : plan?.color === 'gold' ? '#eab308' : '#dc2626'}; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600;">
                ${plan?.icon || '🌐'} ${getPlanName(data.selectedPlan)} Plan - $${monthlyTotal}/month
              </div>
            </td>
          </tr>
          
          <!-- Section 1: Business Assessment -->
          <tr>
            <td style="padding: 24px 40px;">
              <h3 style="margin: 0 0 16px 0; color: #dc2626; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #dc2626; padding-bottom: 8px;">
                Business Assessment
              </h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 8px 0; color: #737373; font-size: 14px; width: 160px;">Business Type:</td>
                  <td style="padding: 8px 0; color: #171717; font-size: 14px; font-weight: 500;">
                    ${e(getBusinessTypeLabel(data.businessType))}${data.businessTypeOther ? ` - ${e(data.businessTypeOther)}` : ''}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #737373; font-size: 14px; width: 160px;">Biggest Challenge:</td>
                  <td style="padding: 8px 0; color: #171717; font-size: 14px; font-weight: 500;">
                    ${e(getChallengeLabel(data.biggestChallenge))}${data.biggestChallengeOther ? ` - ${e(data.biggestChallengeOther)}` : ''}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #737373; font-size: 14px; width: 160px;">Website Goal:</td>
                  <td style="padding: 8px 0; color: #171717; font-size: 14px; font-weight: 500;">${e(getGoalLabel(data.websiteGoal))}</td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Section 2: Selected Plan -->
          <tr>
            <td style="padding: 24px 40px; background-color: #fafafa;">
              <h3 style="margin: 0 0 16px 0; color: #dc2626; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #dc2626; padding-bottom: 8px;">
                Selected Plan
              </h3>
              <div style="background-color: white; border: 2px solid ${plan?.color === 'green' ? '#22c55e' : plan?.color === 'blue' ? '#3b82f6' : plan?.color === 'gold' ? '#eab308' : '#dc2626'}; border-radius: 8px; padding: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                  <span style="font-size: 18px; font-weight: 700; color: #171717;">${plan?.icon || '🌐'} ${getPlanName(data.selectedPlan)}</span>
                  <span style="font-size: 18px; font-weight: 700; color: #dc2626;">$${monthlyTotal}/month</span>
                </div>
                <p style="margin: 0; color: #737373; font-size: 13px;">${plan?.description || ''}</p>
              </div>
            </td>
          </tr>
          
          ${hasAddOns ? `
          <!-- Section 3: Add-Ons -->
          <tr>
            <td style="padding: 24px 40px;">
              <h3 style="margin: 0 0 16px 0; color: #dc2626; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #dc2626; padding-bottom: 8px;">
                Interested In Add-Ons
              </h3>
              <ul style="margin: 0; padding: 0 0 0 20px; color: #171717; font-size: 14px; line-height: 1.8;">
                ${data.selectedAddOns?.map(addOn => `<li>${e(getAddOnLabel(addOn))}</li>`).join('')}
              </ul>
            </td>
          </tr>
          ` : ''}
          
          <!-- Section 4: Contact Info -->
          <tr>
            <td style="padding: 24px 40px; ${hasAddOns ? 'background-color: #fafafa;' : ''}">
              <h3 style="margin: 0 0 16px 0; color: #dc2626; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #dc2626; padding-bottom: 8px;">
                Contact Information
              </h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 8px 0; color: #737373; font-size: 14px; width: 140px;">Full Name:</td>
                  <td style="padding: 8px 0; color: #171717; font-size: 14px; font-weight: 500;">${e(data.fullName)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #737373; font-size: 14px; width: 140px;">Business Name:</td>
                  <td style="padding: 8px 0; color: #171717; font-size: 14px; font-weight: 500;">${e(data.businessName)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #737373; font-size: 14px; width: 140px;">Email:</td>
                  <td style="padding: 8px 0; color: #171717; font-size: 14px; font-weight: 500;">
                    <a href="mailto:${e(data.email)}" style="color: #dc2626; text-decoration: none;">${e(data.email)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #737373; font-size: 14px; width: 140px;">Phone:</td>
                  <td style="padding: 8px 0; color: #171717; font-size: 14px; font-weight: 500;">
                    <a href="tel:${e(data.phoneRaw)}" style="color: #dc2626; text-decoration: none;">${e(data.phoneFormatted || data.phoneRaw)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #737373; font-size: 14px; width: 140px;">Current Website:</td>
                  <td style="padding: 8px 0; color: #171717; font-size: 14px; font-weight: 500;">
                    ${data.currentWebsiteUrl
      ? `<a href="${e(data.currentWebsiteUrl)}" style="color: #dc2626; text-decoration: none;">${e(data.currentWebsiteUrl)}</a>`
      : '<span style="color: #a3a3a3;">None provided</span>'
    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Pricing Summary -->
          <tr>
            <td style="padding: 24px 40px; background-color: #171717;">
              <h3 style="margin: 0 0 16px 0; color: #ffffff; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                Pricing Summary
              </h3>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 8px 0; color: #a3a3a3; font-size: 14px;">Website Maintenance Plan (Required):</td>
                  <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right;">$25/mo</td>
                </tr>
                ${data.selectedPlan !== 'foundation' ? `
                <tr>
                  <td style="padding: 8px 0; color: #a3a3a3; font-size: 14px;">${getPlanName(data.selectedPlan)} Upgrade:</td>
                  <td style="padding: 8px 0; color: #ffffff; font-size: 14px; text-align: right;">+$${monthlyTotal - 25}/mo</td>
                </tr>
                ` : ''}
                <tr>
                  <td colspan="2" style="padding: 12px 0 0 0; border-top: 1px solid #404040;"></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #ffffff; font-size: 16px; font-weight: 700;">Total Monthly Investment:</td>
                  <td style="padding: 8px 0; color: #dc2626; font-size: 20px; font-weight: 700; text-align: right;">$${monthlyTotal}/mo</td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #fafafa; text-align: center;">
              <p style="margin: 0; color: #a3a3a3; font-size: 12px;">
                Built By Gio - Free Website Giveaway Application
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

export function generateApplicationEmailText(
  data: Omit<GiveawayApplicationData, "websiteConfirm" | "termsAccepted"> & { termsAccepted: boolean }
): string {
  const monthlyTotal = calculateMonthlyTotal(data.selectedPlan)
  const hasAddOns = data.selectedAddOns && data.selectedAddOns.length > 0

  return `
NEW FREE WEBSITE GIVEAWAY APPLICATION
======================================

A new local business has applied for the Built By Gio free website giveaway.

BUSINESS NAME: ${data.businessName}
SELECTED PLAN: ${getPlanName(data.selectedPlan)} - $${monthlyTotal}/month

---

BUSINESS ASSESSMENT
-------------------
Business Type: ${getBusinessTypeLabel(data.businessType)}${data.businessTypeOther ? ` - ${data.businessTypeOther}` : ''}
Biggest Challenge: ${getChallengeLabel(data.biggestChallenge)}${data.biggestChallengeOther ? ` - ${data.biggestChallengeOther}` : ''}
Website Goal: ${getGoalLabel(data.websiteGoal)}

CONTACT INFORMATION
-------------------
Full Name: ${data.fullName}
Business Name: ${data.businessName}
Email: ${data.email}
Phone: ${data.phoneFormatted || data.phoneRaw}
Current Website: ${data.currentWebsiteUrl || "None provided"}

${hasAddOns ? `INTERESTED IN ADD-ONS
---------------------
${data.selectedAddOns?.map(addOn => `- ${getAddOnLabel(addOn)}`).join('\n')}

` : ''}PRICING SUMMARY
---------------
Website Maintenance Plan (Required): $25/mo
${data.selectedPlan !== 'foundation' ? `${getPlanName(data.selectedPlan)} Upgrade: +$${monthlyTotal - 25}/mo\n` : ''}
Total Monthly Investment: $${monthlyTotal}/mo

---
Built By Gio - Free Website Giveaway Application
`
}

// Confirmation email sent to applicant
export function generateConfirmationEmailHtml(
  data: { fullName: string; businessName: string; selectedPlan: PlanId }
): string {
  const e = escapeHtml
  const plan = servicePlans.find(p => p.id === data.selectedPlan)
  const monthlyTotal = calculateMonthlyTotal(data.selectedPlan)

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received - Built By Gio</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #dc2626; padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                Built By Gio
              </h1>
              <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px; letter-spacing: 1px;">
                WEB DEVELOPMENT
              </p>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px; text-align: center;">
              <!-- Checkmark Icon -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 0 auto 24px auto;">
  <tr>
    <td align="center" valign="middle" style="width: 80px; height: 80px; background-color: #dcfce7; border-radius: 50%; text-align: center; vertical-align: middle;">
      <span style="font-size: 40px; line-height: 80px; display: inline-block;">✓</span>
    </td>
  </tr>
</table>
              
              <h2 style="margin: 0 0 16px 0; color: #171717; font-size: 24px; font-weight: 700;">
                Application Received!
              </h2>
              
              <p style="margin: 0 0 24px 0; color: #525252; font-size: 16px; line-height: 1.6;">
                Hi ${e(data.fullName.split(' ')[0])},
              </p>
              
              <p style="margin: 0 0 24px 0; color: #525252; font-size: 16px; line-height: 1.6;">
                Thank you for applying to the Built By Gio Free Website Giveaway for <strong>${e(data.businessName)}</strong>.
              </p>
              
              <p style="margin: 0 0 32px 0; color: #525252; font-size: 16px; line-height: 1.6;">
                We've received your application and will review it shortly. If your business is approved, I'll reach out with next steps.
              </p>
              
              <!-- Selected Plan Card -->
              <div style="background-color: #fafafa; border: 1px solid #e5e5e5; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                <p style="margin: 0 0 8px 0; color: #737373; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
                  Your Selected Plan
                </p>
                <p style="margin: 0 0 4px 0; color: #171717; font-size: 20px; font-weight: 700;">
                  ${plan?.icon || '🌐'} ${plan?.name || 'Website Maintenance Plan'}
                </p>
                <p style="margin: 0; color: #dc2626; font-size: 18px; font-weight: 600;">
                  $${monthlyTotal}/month
                </p>
              </div>
              
              <!-- What's Next -->
              <div style="text-align: left; background-color: #fafafa; border-radius: 8px; padding: 24px;">
                <h3 style="margin: 0 0 16px 0; color: #171717; font-size: 16px; font-weight: 600;">
                  What happens next?
                </h3>
                <ol style="margin: 0; padding: 0 0 0 20px; color: #525252; font-size: 14px; line-height: 1.8;">
                  <li style="margin-bottom: 8px;">I'll personally review your application</li>
                  <li style="margin-bottom: 8px;">If approved, I'll reach out with next steps</li>
                  <li style="margin-bottom: 8px;">You'll receive a secure link to reserve your spot</li>
                  <li>Once confirmed, I'll begin building your website</li>
                </ol>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #171717; text-align: center;">
              <p style="margin: 0 0 8px 0; color: #ffffff; font-size: 14px; font-weight: 600;">
                Built By Gio
              </p>
              <p style="margin: 0; color: #a3a3a3; font-size: 12px;">
                Web Development for Local Businesses
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

export function generateConfirmationEmailText(
  data: { fullName: string; businessName: string; selectedPlan: PlanId }
): string {
  const plan = servicePlans.find(p => p.id === data.selectedPlan)
  const monthlyTotal = calculateMonthlyTotal(data.selectedPlan)

  return `
APPLICATION RECEIVED - BUILT BY GIO
===================================

Hi ${data.fullName.split(' ')[0]},

Thank you for applying to the Built By Gio Free Website Giveaway for ${data.businessName}.

We've received your application and will review it shortly. If your business is approved, I'll reach out with next steps.

YOUR SELECTED PLAN
------------------
${plan?.icon || '🌐'} ${plan?.name || 'Website Maintenance Plan'}
$${monthlyTotal}/month

WHAT HAPPENS NEXT?
------------------
1. I'll personally review your application
2. If approved, I'll reach out with next steps
3. You'll receive a secure link to reserve your spot
4. Once confirmed, I'll begin building your website

---
Built By Gio
Web Development for Local Businesses
`
}
