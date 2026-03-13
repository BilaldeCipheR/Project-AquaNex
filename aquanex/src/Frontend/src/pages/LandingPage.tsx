import { motion, useScroll } from "framer-motion";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import StatsSection from "@/components/landing/StatsSection";
import SolutionsSection from "@/components/landing/SolutionsSection";
import CTASection from "@/components/landing/CTASection";
import Logo from "@/components/Logo";

const articles = [
  {
    title: "Sustainable Water Management in Arid Regions",
    link: "https://www.unwater.org/water-facts/water-quality-and-wastewater",
  },
  {
    title: "Smart Irrigation Best Practices",
    link: "https://www.fao.org/3/i2800e/i2800e.pdf",
  },
  {
    title: "Water Conservation in Agriculture",
    link: "https://www.worldbank.org/en/topic/water-in-agriculture",
  },
];

const LandingPage = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ background: "#f5f0e8", scrollBehavior: "smooth" }}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-50"
        style={{
          scaleX: scrollYProgress,
          background: "#86efac",
        }}
      />

      {/* Animated ambient background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute w-[900px] h-[900px] rounded-full blur-[140px]"
          style={{ background: "rgba(134,239,172,0.15)" }}
          animate={{
            x: [0, 200, -100, 0],
            y: [0, -100, 200, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute right-0 top-1/3 w-[800px] h-[800px] rounded-full blur-[140px]"
          style={{ background: "rgba(96,165,250,0.15)" }}
          animate={{
            x: [0, -200, 100, 0],
            y: [0, 150, -150, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="page-content">

        <Header />
        <HeroSection />

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <FeaturesSection />
        </motion.div>

        {/* Stats */}
        <motion.div
          style={{ background: "#0a0a0a" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <StatsSection />
        </motion.div>

        {/* Solutions */}
        <motion.div
          style={{ background: "#ffffff" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <SolutionsSection />
        </motion.div>

        {/* Resources Section */}
        <motion.section
          id="resources"
          style={{ background: "#0a0a0a" }}
          className="py-28 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-6">

            <motion.div
              className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#86efac" }}>
                  Resources
                </p>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: "#f9fafb" }}>
                  Sustainability<br />Insights
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-relaxed" style={{ color: "#6b7280" }}>
                Insights from leading agriculture and water research bodies around the world.
              </p>
            </motion.div>

            {/* Article Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <motion.a
                  key={index}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between rounded-2xl p-8"
                  style={{
                    background: "#1c1c1c",
                    border: "1px solid rgba(255,255,255,0.09)",
                    minHeight: "220px",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.12 }}
                >
                  <span
                    className="text-xs font-mono mb-6 block"
                    style={{ color: "#86efac" }}
                  >
                    0{index + 1}
                  </span>

                  <h3
                    className="text-base font-semibold leading-snug mb-6 flex-1"
                    style={{ color: "#f9fafb" }}
                  >
                    {article.title}
                  </h3>

                  <div
                    className="flex items-center justify-between pt-4"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <span className="text-xs" style={{ color: "#6b7280" }}>
                      External Resource
                    </span>

                    <motion.span
                      className="text-sm font-medium"
                      style={{ color: "#86efac" }}
                      whileHover={{ x: 6 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      Read more →
                    </motion.span>
                  </div>
                </motion.a>
              ))}
            </div>

          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          style={{ background: "#faf7f2" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <CTASection />
        </motion.div>

        {/* Footer */}
        <footer style={{ background: "#0a0a0a" }} className="py-20">
          <div className="container mx-auto px-6">

            <div
              className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12"
              style={{ borderBottom: "1px solid #ffffff10" }}
            >
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Logo size="sm" withText={false} className="text-[#86efac]" />
                  <span className="text-lg font-bold" style={{ color: "#f9fafb" }}>
                    AquaNex
                  </span>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>
                  Smart Irrigation Solutions for Sustainable Agriculture
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#f9fafb" }}>
                  Product
                </h4>

                <ul className="space-y-2">
                  {["Features", "Solutions", "Pricing"].map((item) => (
                    <li key={item}>
                      <a className="text-sm text-gray-500 hover:text-white transition">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#f9fafb" }}>
                  Company
                </h4>

                <ul className="space-y-2">
                  {["About", "Blog", "Careers"].map((item) => (
                    <li key={item}>
                      <a className="text-sm text-gray-500 hover:text-white transition">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#f9fafb" }}>
                  Contact
                </h4>

                <address className="not-italic text-sm space-y-1" style={{ color: "#6b7280" }}>
                  <p>Dubai, UAE</p>
                  <p>info@aquanex.app</p>
                </address>
              </div>
            </div>

            <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} AquaNex. All rights reserved.
              </p>

              <div className="flex gap-6">
                {["Terms & Conditions", "Privacy Policy"].map((item) => (
                  <a key={item} className="text-sm text-gray-600 hover:text-white transition">
                    {item}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </footer>

      </div>
    </motion.div>
  );
};

export default LandingPage;