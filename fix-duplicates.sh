#!/bin/bash

echo "Removing duplicate Header and Footer imports and usage from all page components..."

# List of pages that need fixing
pages=(
  "src/pages/Search.tsx"
  "src/pages/GuestDashboard.tsx" 
  "src/pages/HelpCenter.tsx"
  "src/pages/PropertyDetail.tsx"
  "src/pages/Settings.tsx"
  "src/pages/AddListing.tsx"
  "src/pages/HostDashboard.tsx"
  "src/pages/Careers.tsx"
  "src/pages/HostResources.tsx"
  "src/pages/BookingPayment.tsx"
  "src/pages/Profile.tsx"
  "src/pages/About.tsx"
  "src/pages/Wishlist.tsx"
  "src/pages/CommunityForum.tsx"
  "src/pages/CancellationOptions.tsx"
  "src/pages/ContactUs.tsx"
  "src/pages/DisabilitySupport.tsx"
  "src/pages/ResponsibleHosting.tsx"
  "src/pages/HostGuarantee.tsx"
  "src/pages/Investors.tsx"
  "src/pages/Press.tsx"
  "src/pages/AdminDashboard.tsx"
  "src/pages/PrivacyPolicy.tsx"
  "src/pages/TermsOfService.tsx"
  "src/pages/SafetyInformation.tsx"
)

for page in "${pages[@]}"; do
  if [ -f "$page" ]; then
    echo "Processing $page..."
    
    # Remove Header import line
    sed -i '/import.*Header.*from.*layout\/Header/d' "$page"
    
    # Remove Footer import line  
    sed -i '/import.*Footer.*from.*layout\/Footer/d' "$page"
    
    # Remove <Header /> usage
    sed -i '/<Header \/>/d' "$page"
    
    # Remove <Footer /> usage
    sed -i '/<Footer \/>/d' "$page"
    
    echo "✓ Fixed $page"
  else
    echo "⚠ $page not found, skipping..."
  fi
done

echo "✅ All duplicate headers and footers removed!"
echo "The layout will now be handled exclusively by App.tsx"
