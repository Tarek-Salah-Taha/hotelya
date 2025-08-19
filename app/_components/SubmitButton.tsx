import { motion } from "framer-motion";
import { FiLoader } from "react-icons/fi";

export default function SubmitButton({
  loading,
  t,
}: {
  loading: boolean;
  t: (key: string) => string;
}) {
  return (
    <motion.div>
      <motion.button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r bg-primary text-white py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        {loading ? (
          <>
            <FiLoader className="animate-spin" />
            {t("Signing in")}
          </>
        ) : (
          t("Sign In")
        )}
      </motion.button>
    </motion.div>
  );
}
