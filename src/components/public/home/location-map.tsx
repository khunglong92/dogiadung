import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function LocationMap() {
  const { t } = useTranslation();
  const companyPhone = import.meta.env.VITE_COMPANY_PHONE || "0967853383";
  const companyEmail = "kimloaitamthienloc@gmail.com";

  const contactInfo = [
    {
      icon: MapPin,
      titleKey: "location.address",
      contentKey: "location.addressValue",
      color: "from-red-500 to-pink-600",
    },
    {
      icon: Phone,
      titleKey: "location.phone",
      contentKey: "location.phoneValue",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Mail,
      titleKey: "location.email",
      contentKey: "location.emailValue",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: Clock,
      titleKey: "location.workingHours",
      contentKey: "location.workingHoursValue",
      color: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <section id="location" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="mb-4 text-3xl md:text-4xl font-bold">
            {t("location.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            {t("location.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-card rounded-2xl p-8 shadow-lg border">
              <h3 className="mb-6 text-2xl font-bold">
                {t("location.contactInfo")}
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={info.titleKey}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-all duration-300 cursor-pointer border border-transparent hover:border-border"
                    >
                      <motion.div
                        className={`p-3 rounded-lg bg-linear-to-br ${info.color} shrink-0 shadow-md`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold mb-1">
                          {t(info.titleKey)}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {t(info.contentKey)}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Consultation Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-linear-to-br from-amber-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden"
            >
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-amber-600/50 to-orange-700/50 opacity-50" />
              <div className="relative z-10">
                <h3 className="mb-4 text-2xl font-bold text-white">
                  {t("location.consultationTitle")}
                </h3>
                <p className="mb-6 text-white/90 leading-relaxed">
                  {t("location.consultationDescription")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-amber-600 hover:bg-white/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <a href={`tel:${companyPhone}`}>
                      <Phone className="h-5 w-5 mr-2" />
                      {t("location.callNow")}
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="bg-white/10 backdrop-blur-md border-2 border-white text-white hover:bg-white/20 font-semibold transition-all duration-300"
                  >
                    <a href={`mailto:${companyEmail}`}>
                      <Mail className="h-5 w-5 mr-2" />
                      {t("location.sendEmail")}
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-card rounded-2xl overflow-hidden shadow-lg border h-full min-h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4949653591754!2d106.70291897570754!3d10.775017889375406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc9%3A0xb26520701e572a5d!2zTMOqIEzhu5tpLCBCw6puIE5naOG6uSwgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1699999999999!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[500px]"
                title="Thiên Lộc Location"
              />
            </div>

            {/* Decorative overlay */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -top-6 -left-6 w-32 h-32 bg-linear-to-br from-blue-500 to-cyan-500 rounded-full opacity-20 blur-2xl pointer-events-none"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
