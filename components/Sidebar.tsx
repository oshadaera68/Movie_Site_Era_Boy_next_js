import SocialPlugin from "./SocialPlugin";
import Labels from "./Labels";

export default function Sidebar() {
  return (
    <aside className="space-y-6">
      <SocialPlugin />
      <Labels />
    </aside>
  );
}
