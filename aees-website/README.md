# AEES Website

A 3-page website for **AEES** (Electrical · Solar · Security · Automation):

- `index.html` — Home page: intro, services, about, values
- `appointment.html` — Appointment booking form
- `profile.html` — Founder profile (Adeleye Eyitayo)

No build step, no framework — just HTML, CSS, and JavaScript. That means it's simple to host for free and simple to edit later, even without much coding experience.

---

## 1. Connect the appointment form (2 minutes)

Right now the booking form is live and validates input, but it has nowhere to send submissions yet — you'll get a message in the app telling you this until you connect an inbox. The easiest free way to do that:

1. Go to **[formspree.io](https://formspree.io)** and create a free account.
2. Create a new form and copy the endpoint it gives you — it looks like `https://formspree.io/f/abc1234`.
3. Open `js/main.js` in a text editor, find this line near the top of `initAppointmentForm()`:
   ```js
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
   ```
4. Replace `YOUR_FORM_ID` with your real ID and save.

That's it — form submissions will now email straight to your inbox. Formspree's free plan covers 50 submissions/month, which is plenty to start.

*(Alternative: if you'd rather not sign up for anything, you can change the form to a plain `mailto:` link instead — ask me and I'll wire that up.)*

---

## 2. Put your real contact details in

Search each HTML file for these and update them if needed:
- Phone: `+234 706 269 2654` (from your logo)
- Email: `aees.services@gmail.com` (placeholder — replace with your real email everywhere it appears)

---

## 3. Deploy for free on Vercel

You don't need to install anything or write any commands if you don't want to — Vercel can deploy straight from a folder.

### Easiest way — drag and drop
1. Go to **[vercel.com](https://vercel.com)** and sign up (free).
2. From your dashboard, click **Add New → Project**.
3. Choose **"Deploy without Git"** (or look for a drag-and-drop upload area).
4. Drag your whole `aees-website` folder in.
5. Click **Deploy**. In under a minute you'll get a live link like `aees-website.vercel.app`.

### Recommended way — GitHub + Vercel (keeps updating easy)
1. Create a free account at **[github.com](https://github.com)** if you don't have one.
2. Create a new repository and upload this folder to it (GitHub's web uploader works fine — no command line needed).
3. Go to **[vercel.com](https://vercel.com)**, sign up, and click **Add New → Project**.
4. Choose **Import Git Repository** and pick the repo you just created.
5. Leave all settings as default (no framework, no build command needed) and click **Deploy**.
6. Every time you update files on GitHub afterward, Vercel automatically redeploys your live site.

### Custom domain (optional)
Once deployed, go to your project's **Settings → Domains** in Vercel and add a domain you own (e.g. `aees.ng`) — Vercel gives you free HTTPS automatically.

---

## 4. Editing content later

- **Text**: open any `.html` file in a text editor and change the words between tags — everything is plain, readable HTML.
- **Colors**: all brand colors live at the top of `css/style.css` under `:root { ... }` — change `--navy-900` or `--orange-500` and the whole site updates.
- **Photos**: replace files in `images/` and keep the same filenames, or update the `src="images/..."` paths in the HTML.

---

## What's already built in

- Responsive layout (phone, tablet, desktop)
- Animated hero with a circuit-line motif tying back to the AEES logo
- Scroll-triggered reveal animations
- Mobile hamburger menu
- Client-side form validation with helpful inline errors
- Reduced-motion support for accessibility
