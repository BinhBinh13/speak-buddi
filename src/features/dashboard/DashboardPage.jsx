import AppLayout       from "../../shared/components/AppLayout";
import DashRightPanel  from "./components/DashRightPanel";
import AICoachMobileBanner from "./components/AICoachMobileBanner";
import RoadmapSection  from "./components/RoadmapSection";
import { COLORS } from "../../shared/constants/theme";

export default function DashboardPage() {
  return (
    <AppLayout rightPanel={<DashRightPanel />}>
      <main style={styles.main}>
        <AICoachMobileBanner />
        <RoadmapSection />
      </main>
    </AppLayout>
  );
}

const styles = {
  main: {
    padding: "28px clamp(20px, 3vw, 40px) 40px",
  },
};
