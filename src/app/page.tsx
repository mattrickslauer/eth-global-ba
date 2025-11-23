import styles from "./page.module.css";
import Providers from "@/components/Providers";
import ClientApp from "@/components/ClientApp";

export default function Home() {
  return (
    <div className={styles.page}>
      <Providers>
        <ClientApp />
      </Providers>
    </div>
  );
}
