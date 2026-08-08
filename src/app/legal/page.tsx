import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal, Privacy & Website Notice | Solomon Atah",
  description: "Legal, Privacy, and Website Notice for Solomon Atah Pty Ltd.",
};

export default function LegalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
          Legal, Privacy & Website Notice
        </h1>
        <p className="text-sm text-muted-foreground mb-12">
          Effective Date: 8 August 2026
          <br />
          Last Updated: 8 August 2026
        </p>

        <section id="about" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">1. About This Notice</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            This website, solomonatah.com, is operated by Solomon Atah Pty Ltd,
            a South African company operating across media, research, publishing,
            academic services, intellectual and cultural production.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            By using this website, you agree to the terms set out below. This
            notice is intended to explain, in straightforward language, how we
            handle information, content and interactions through the website.
          </p>
        </section>

        <section id="privacy" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">2. Privacy</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We respect your privacy and take reasonable steps to protect personal
            information provided to us. Depending on how you interact with the
            website, we may collect information such as your name, email address,
            telephone number, professional or academic affiliation, information
            submitted through forms, event or service enquiries, and technical
            information relating to your use of the website.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We use this information to respond to enquiries, provide services,
            manage podcast and event participation, communicate with users,
            administer transactions, improve our website and services, maintain
            security, and meet legal or regulatory obligations. We do not sell
            your personal information.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Personal information is handled in accordance with applicable South
            African law, including the Protection of Personal Information Act 4 of
            2013 (POPIA).
          </p>
        </section>

        <section id="cookies" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            3. Cookies and Website Analytics
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            This website may use cookies and similar technologies to support
            website functionality, security, preferences and analytics. These
            technologies may help us understand how visitors use the website and
            improve its performance.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Some embedded or linked services, including video, audio, social media,
            analytics, payment or other third-party platforms, may also use their
            own cookies or tracking technologies. Those services operate under
            their own privacy policies. You can manage or disable cookies through
            your browser settings, although doing so may affect some website
            functionality.
          </p>
        </section>

        <section id="podcast-consent" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            4. Podcast and Media Participation
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The Solomon Atah Podcast is a public-facing media and intellectual
            platform. If you participate in a podcast, interview, event, video,
            audio recording or related project, you understand that your name,
            image, voice, biography, professional information, research and
            statements may be recorded, edited, published, archived and promoted
            through our website, YouTube, podcast platforms, social media and
            other associated channels.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Participation is generally voluntary and does not create an entitlement
            to payment unless separately agreed in writing. Participants remain
            responsible for ensuring that information they provide does not
            unlawfully disclose confidential information or infringe the rights of
            others.
          </p>
        </section>

        <section id="copyright" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            5. Website Content and Intellectual Property
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Unless otherwise stated, the text, articles, research, photographs,
            graphics, videos, audio, logos, branding, publications, original
            frameworks and other material published on this website belong to,
            are licensed to, or are used with permission by Solomon Atah Pty Ltd
            or the relevant rights holder.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You may read, reference and share reasonable portions of publicly
            available material for legitimate personal, educational, research or
            non-commercial purposes, provided appropriate attribution is given.
            Substantial reproduction, commercial use, republication, modification
            or redistribution requires permission unless permitted by law.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Podcast recordings, publications and other original creative works may
            be subject to additional copyright and licensing restrictions.
          </p>
        </section>

        <section id="terms" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            6. Material You Submit
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            When you submit information, ideas, research, proposals, comments,
            photographs, documents or other material to us, you confirm that you
            have the right to provide that material and that doing so does not
            knowingly infringe another person&apos;s rights.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Submitting material does not automatically transfer copyright to us,
            but you grant us a non-exclusive, royalty-free, worldwide licence to
            use, publish, edit, reproduce and distribute that material in
            connection with the website, podcast and related platforms.
          </p>
        </section>

        <section id="disclaimer" className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">7. Disclaimers</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The content on this website, including podcast episodes, articles and
            research, is provided for general information, intellectual engagement
            and entertainment purposes. It does not constitute professional, legal,
            financial or academic advice.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            While we strive to provide accurate and thought-provoking content, we
            do not guarantee the completeness, accuracy or reliability of any
            information. The views and opinions expressed by podcast guests, authors
            or contributors are their own and do not necessarily reflect the views
            of Solomon Atah Pty Ltd.
          </p>
        </section>
      </div>
    </div>
  );
}
