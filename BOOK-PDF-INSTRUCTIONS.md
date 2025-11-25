# KetoWell Book PDF Upload Instructions

## Overview

The book page is now live at `/book` on your website. However, the actual PDF file needs to be uploaded to make the download functionality work.

## Required Action

Upload the compiled book PDF file to the following location:

```
/home/ubuntu/keto-health-website/client/public/ketowell-book.pdf
```

## Book PDF Details

- **File name:** `ketowell-book.pdf`
- **Expected size:** ~1.3 MB
- **Format:** PDF
- **Content:** Complete 56,620-word manuscript with all chapters

## Where to Find the Book PDF

The book PDF was previously generated and should be available at:
- `/home/ubuntu/ketowell-book.pdf` (if still available after sandbox reset)

If the file is not available, you'll need to:
1. Compile the book from the chapter markdown files
2. Convert to PDF using `manus-md-to-pdf` utility
3. Copy to the public directory

## Alternative: Generate New PDF

If you need to regenerate the PDF:

```bash
# Navigate to home directory
cd /home/ubuntu

# Compile all chapters into one file
cat ketowell-preface.md ketowell-introduction.md ketowell-chapter-*.md ketowell-conclusion.md > ketowell-complete-book.md

# Convert to PDF
manus-md-to-pdf ketowell-complete-book.md ketowell-book.pdf

# Copy to website public directory
cp ketowell-book.pdf /home/ubuntu/keto-health-website/client/public/ketowell-book.pdf
```

## Verify Download Works

After uploading the PDF:

1. Visit `https://[your-domain]/book`
2. Click the "Download Free PDF" button
3. Verify the PDF opens in a new tab
4. Confirm all content is present and properly formatted

## Amazon Pre-Order Link

The Amazon pre-order button currently links to a placeholder URL:
```
https://www.amazon.com/dp/[YOUR-ASIN]
```

Update this in `/home/ubuntu/keto-health-website/client/src/pages/Book.tsx` once you have your Amazon ASIN:

```typescript
const handleAmazonPreorder = () => {
  // Replace [YOUR-ASIN] with actual Amazon ASIN
  window.open("https://www.amazon.com/dp/[YOUR-ASIN]", "_blank");
};
```

## Book Cover Image

The book cover image has been generated and is located at:
```
/home/ubuntu/keto-health-website/client/public/images/ketowell-book-cover.png
```

This image is already being used on the book page.

## SEO Optimization

The book page includes comprehensive SEO meta tags:
- Title: "KetoWell Book - Transform Your Health with Ketogenic Living"
- Description: Optimized for search engines
- Keywords: ketogenic diet book, diabetes reversal, metabolic health
- Open Graph image: Book cover

## Page Features

The book page includes:
- ✅ Hero section with book cover and CTA buttons
- ✅ Book statistics (200+ studies, 14 chapters, 8-10h read time)
- ✅ "What You'll Learn" section with 6 key topics
- ✅ "About This Book" comprehensive description
- ✅ "What Makes KetoWell Different" with 6 unique features
- ✅ Table of Contents preview
- ✅ FAQ section with 6 common questions
- ✅ Final CTA section with download and pre-order buttons
- ✅ Mobile responsive design
- ✅ SEO optimized

## Next Steps

1. Upload the PDF file to the public directory
2. Test the download functionality
3. Update the Amazon pre-order link when available
4. Promote the book page on social media and email campaigns
5. Track downloads and conversions

## Support

If you encounter any issues with the book page or PDF upload, check:
- File permissions on the public directory
- PDF file size (should be under 5 MB for fast downloads)
- Browser console for any JavaScript errors
- Network tab to verify PDF is being served correctly
