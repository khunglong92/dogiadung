import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/services/api/base";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Textarea,
  Button,
  Grid,
  Text,
  Group,
  Title,
  Paper,
  Box,
  Anchor,
} from "@mantine/core";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
// import { AppThumbnailImage } from "@/components/public/common/app-thumbnail-image";

interface ContactFormData {
  name: string;
  title: string;
  phone: string;
  email: string;
  address: string;
  content: string;
}

export default function ContactPage() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    initialValues: {
      name: "",
      title: "",
      phone: "",
      email: "",
      address: "",
      content: "",
    },
    validate: {
      name: (value) =>
        value.trim().length > 0 ? null : t("contact.form.requiredFields"),
      title: (value) =>
        value.trim().length > 0 ? null : t("contact.form.requiredFields"),
      content: (value) =>
        value.trim().length > 0 ? null : t("contact.form.requiredFields"),
    },
  });

  const handleSubmit = async (values: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await apiClient.post("contacts", values);
      toast.success(t("contact.form.successMessage"));
      form.reset();
    } catch (error: any) {
      toast.error(error?.message || t("contact.form.errorMessage"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: t("contact.info.hotline"),
      value: "0343 099 888",
      href: "tel:0343099888",
    },
    {
      icon: Mail,
      label: "Email",
      value: "sxtmtt@gmail.com",
      href: "mailto:sxtmtt@gmail.com",
    },
    {
      icon: MapPin,
      label: t("contact.info.hanoi.label"),
      value: t("contact.info.hanoi.address"),
    },
    {
      icon: MapPin,
      label: t("contact.info.factory.label"),
      value: t("contact.info.factory.address"),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring" as const, stiffness: 100 },
    },
  };

  return (
    <Box className={cn("min-h-screen", isDark ? "bg-gray-900" : "bg-gray-50")}>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-24 md:py-32 overflow-hidden"
      >
        <div
          className={cn(
            "absolute inset-0 opacity-50",
            isDark
              ? "bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-red-900/50 to-transparent"
              : "bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-red-100 to-transparent"
          )}
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Title
            order={1}
            className="text-5xl md:text-7xl font-bold mb-4 text-red-600 dark:text-red-400"
          >
            {t("contact.title")}
          </Title>
          <Text
            size="xl"
            className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            {t("contact.subtitle")}
          </Text>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-20 md:pb-32 -mt-16">
        <Paper
          withBorder
          radius="lg"
          p={0}
          className="shadow-2xl bg-white dark:bg-gray-800/50 overflow-hidden"
        >
          <Grid gutter={0}>
            {/* Contact Form */}
            <Grid.Col span={{ base: 12, lg: 7 }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="p-8 md:p-12 h-full"
              >
                <Title
                  order={2}
                  className="text-3xl font-bold mb-2 text-gray-800 dark:text-white"
                >
                  {t("contact.form.title")}
                </Title>
                <Text c="dimmed" className="mb-8">
                  {t("contact.form.description")}
                </Text>

                <form
                  onSubmit={form.onSubmit(handleSubmit)}
                  className="space-y-6"
                >
                  <Grid gutter="md">
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label={t("contact.form.name")}
                        placeholder={t("contact.form.namePlaceholder")}
                        required
                        size="md"
                        {...form.getInputProps("name")}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label={t("contact.form.title")}
                        placeholder={t("contact.form.titlePlaceholder")}
                        required
                        size="md"
                        {...form.getInputProps("title")}
                      />
                    </Grid.Col>
                  </Grid>

                  <Grid gutter="md">
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label={t("contact.form.phone")}
                        placeholder={t("contact.form.phonePlaceholder")}
                        type="tel"
                        size="md"
                        {...form.getInputProps("phone")}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label={t("contact.form.email")}
                        placeholder={t("contact.form.emailPlaceholder")}
                        type="email"
                        size="md"
                        {...form.getInputProps("email")}
                      />
                    </Grid.Col>
                  </Grid>

                  <Textarea
                    label={t("contact.form.content")}
                    placeholder={t("contact.form.contentPlaceholder")}
                    required
                    rows={5}
                    size="md"
                    {...form.getInputProps("content")}
                  />

                  <Button
                    type="submit"
                    loading={isSubmitting}
                    fullWidth
                    size="lg"
                    variant="gradient"
                    gradient={{ from: "red", to: "orange" }}
                    leftSection={<Send size={18} />}
                  >
                    {isSubmitting
                      ? t("contact.form.sending")
                      : t("contact.form.submit")}
                  </Button>
                </form>
              </motion.div>
            </Grid.Col>

            {/* Map and Info */}
            <Grid.Col span={{ base: 12, lg: 5 }}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative min-h-[400px] lg:min-h-full h-full p-8 md:p-12 flex flex-col justify-center"
              >
                {/* <AppThumbnailImage
                  src={mapImage}
                  alt="Map background"
                  className="absolute inset-0 w-full h-full object-cover"
                /> */}
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10 space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.03 }}
                      className="bg-white/10 dark:bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-white/20"
                    >
                      <Group wrap="nowrap" align="start">
                        <Box className="text-red-400 pt-1">
                          <info.icon size={20} />
                        </Box>
                        <div>
                          <Text fw={600} className="text-white">
                            {info.label}
                          </Text>
                          {info.href ? (
                            <Anchor
                              href={info.href}
                              className="text-gray-200 hover:text-white transition-colors"
                            >
                              {info.value}
                            </Anchor>
                          ) : (
                            <Text size="sm" className="text-gray-300">
                              {info.value}
                            </Text>
                          )}
                        </div>
                      </Group>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Grid.Col>
          </Grid>
        </Paper>
      </section>
    </Box>
  );
}
