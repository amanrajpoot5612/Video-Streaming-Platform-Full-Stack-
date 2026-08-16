import { Bug } from "lucide-react";

const Preloader = () => (
  <main className="bugsy-preloader" aria-label="Loading Bugsy">
    <div className="bugsy-preloader__mark"><Bug size={34} strokeWidth={2.3} /></div>
    <p>Loading Bugsy</p>
    <span className="bugsy-preloader__track"><i /></span>
  </main>
);

export default Preloader;
