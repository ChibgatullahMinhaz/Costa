import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl p-8 mx-auto my-16 bg-white rounded-lg shadow-lg">
      <h1 className="mb-6 text-3xl font-bold text-green-700">Privacy Policy</h1>
      
      <p className="mb-4">
        Your privacy is important to us. This policy explains how we collect, use,
        and protect your personal information when you use our website.
      </p>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">Information We Collect</h2>
        <ul className="space-y-1 list-disc list-inside">
          <li>Personal details like name, email address, phone number.</li>
          <li>Information automatically collected such as IP address, browser type, and cookies.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">How We Use Your Information</h2>
        <ul className="space-y-1 list-disc list-inside">
          <li>To provide and improve our services.</li>
          <li>To communicate with you.</li>
          <li>For marketing and promotional purposes (only with your consent).</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">Cookies</h2>
        <p>
          We use cookies to enhance your experience on our website. You can control
          or disable cookies through your browser settings.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">Data Sharing</h2>
        <p>
          We do not sell your personal information. We may share your data with trusted
          third-party service providers to help us operate our business.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">Data Security</h2>
        <p>
          We implement reasonable security measures to protect your data from unauthorized
          access or disclosure.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal information. You can
          also withdraw your consent at any time.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-2xl font-semibold">Contact Us</h2>
        <p>
          If you have any questions about this privacy policy, please contact us at{" "}
          <a href="mailto:support@example.com" className="text-green-600 underline">
            support@example.com
          </a>.
        </p>
      </section>

      <p className="mt-10 text-sm text-gray-500">
        <em>Last updated: August 2025</em>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
