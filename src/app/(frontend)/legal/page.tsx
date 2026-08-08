import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal, Privacy & Website Notice | Solomon Atah",
  description: "Legal, Privacy, and Website Notice for Solomon Atah Pty Ltd.",
};

export default function LegalPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Page header */}
      <header className="max-w-3xl mb-16 pb-16 border-b border-border">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
          Solomon Atah Pty Ltd
        </p>
        <h1 className="font-fraunces text-4xl md:text-6xl font-light leading-tight mb-6">
          Legal, Privacy & Website Notice
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Effective Date: 8 August 2026
          <br />
          Last Updated: 8 August 2026
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-16">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-16">
          <section id="about">
            <h2 className="font-fraunces text-3xl mb-6">1. About This Notice</h2>
            <div className="prose-editorial space-y-5 text-muted-foreground">
              <p>
                This website, solomonatah.com, is operated by Solomon Atah Pty Ltd,
                a South African company operating across media, research, publishing,
                academic services, intellectual and cultural production.
              </p>
              <p>
                By using this website, you agree to the terms set out below. This
                notice is intended to explain, in straightforward language, how we
                handle information, content and interactions through the website.
              </p>
            </div>
          </section>

          <section id="privacy">
            <h2 className="font-fraunces text-3xl mb-6">2. Privacy</h2>
            <div className="prose-editorial space-y-5 text-muted-foreground">
              <p>
                We respect your privacy and take reasonable steps to protect personal
                information provided to us. Depending on how you interact with the
                website, we may collect information such as your name, email address,
                telephone number, professional or academic affiliation, information
                submitted through forms, event or service enquiries, and technical
                information relating to your use of the website.
              </p>
              <p>
                We use this information to respond to enquiries, provide services,
                manage podcast and event participation, communicate with users,
                administer transactions, improve our website and services, maintain
                security, and meet legal or regulatory obligations. We do not sell
                your personal information.
              </p>
              <p>
                Personal information is handled in accordance with applicable South
                African law, including the Protection of Personal Information Act 4 of
                2013 (POPIA).
              </p>
            </div>
          </section>

          <section id="cookies">
            <h2 className="font-fraunces text-3xl mb-6">
              3. Cookies and Website Analytics
            </h2>
            <div className="prose-editorial space-y-5 text-muted-foreground">
              <p>
                This website may use cookies and similar technologies to support
                website functionality, security, preferences and analytics. These
                technologies may help us understand how visitors use the website and
                improve its performance.
              </p>
              <p>
                Some embedded or linked services, including video, audio, social media,
                analytics, payment or other third-party platforms, may also use their
                own cookies or tracking technologies. Those services operate under
                their own privacy policies. You can manage or disable cookies through
                your browser settings, although doing so may affect some website
                functionality.
              </p>
            </div>
          </section>

          <section id="podcast-consent">
            <h2 className="font-fraunces text-3xl mb-6">
              4. Podcast and Media Participation
            </h2>
            <div className="prose-editorial space-y-5 text-muted-foreground">
              <p>
                The Solomon Atah Podcast is a public-facing media and intellectual
                platform. If you participate in a podcast, interview, event, video,
                audio recording or related project, you understand that your name,
                image, voice, biography, professional information, research and
                statements may be recorded, edited, published, archived and promoted
                through our website, YouTube, podcast platforms, social media and
                other associated channels.
              </p>
              <p>
                Participation is generally voluntary and does not create an entitlement
                to payment unless separately agreed in writing. Participants remain
                responsible for ensuring that information they provide does not
                unlawfully disclose confidential information or infringe the rights of
                others.
              </p>
            </div>
          </section>

          <section id="copyright">
            <h2 className="font-fraunces text-3xl mb-6">
              5. Website Content and Intellectual Property
            </h2>
            <div className="prose-editorial space-y-5 text-muted-foreground">
              <p>
                Unless otherwise stated, the text, articles, research, photographs,
                graphics, videos, audio, logos, branding, publications, original
                frameworks and other material published on this website belong to,
                are licensed to, or are used with permission by Solomon Atah Pty Ltd
                or the relevant rights holder.
              </p>
              <p>
                You may read, reference and share reasonable portions of publicly
                available material for legitimate personal, educational, research or
                non-commercial purposes, provided appropriate attribution is given.
                Substantial reproduction, commercial use, republication, modification
                or redistribution requires permission unless permitted by law.
              </p>
              <p>
                Podcast recordings, publications and other original creative works may
                be subject to additional copyright and licensing restrictions.
              </p>
            </div>
          </section>

          <section id="terms">
            <h2 className="font-fraunces text-3xl mb-6">
              6. Material You Submit
            </h2>
            <div className="prose-editorial space-y-5 text-muted-foreground">
              <p>
                When you submit information, ideas, research, proposals, comments,
                photographs, documents or other material to us, you confirm that you
                have the right to provide that material and that doing so does not
                knowingly infringe another person&apos;s rights.
              </p>
              <p>
                Submitting material does not automatically transfer copyright to us,
                but you grant us a non-exclusive, royalty-free, worldwide licence to
                use, publish, edit, reproduce and distribute that material in
                connection with the website, podcast and related platforms.
              </p>
            </div>
          </section>

          <section id="disclaimer">
            <h2 className="font-fraunces text-3xl mb-6">7. Disclaimers</h2>
            <div className="prose-editorial space-y-5 text-muted-foreground">
              <p>
                The content on this website, including podcast episodes, articles and
                research, is provided for general information, intellectual engagement
                and entertainment purposes. It does not constitute professional, legal,
                financial or academic advice.
              </p>
              <p>
                While we strive to provide accurate and thought-provoking content, we
                do not guarantee the completeness, accuracy or reliability of any
                information. The views and opinions expressed by podcast guests, authors
                or contributors are their own and do not necessarily reflect the views
                of Solomon Atah Pty Ltd.
              </p>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="sticky top-24 space-y-8">
            {/* Quick links */}
            <div className="border border-border rounded-sm p-6">
              <h3 className="font-fraunces text-lg mb-4">On this page</h3>
              <nav className="space-y-2">
                {[
                  { label: "About This Notice", href: "#about" },
                  { label: "Privacy", href: "#privacy" },
                  { label: "Cookies", href: "#cookies" },
                  { label: "Podcast Consent", href: "#podcast-consent" },
                  { label: "Intellectual Property", href: "#copyright" },
                  { label: "Material You Submit", href: "#terms" },
                  { label: "Disclaimers", href: "#disclaimer" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1 border-l-2 border-transparent hover:border-gold pl-3"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="border border-border rounded-sm p-6 bg-purple/5">
              <h3 className="font-fraunces text-lg mb-3">Questions?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you have any questions or concerns about this notice, please
                reach out to our legal team.
              </p>
              <a
                href="/contact"
                className="inline-flex w-full items-center justify-center px-4 py-2 bg-purple text-white text-sm font-medium rounded-sm hover:bg-purple/90 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
