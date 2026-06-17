/**
 * Usage:
 * import { useScrollToContact } from "@/hooks/useScrollToContact";
 * 
 *   const scrollToContact = useScrollToContact();
 *   <Button text="Book a Strategy Call" onClick={scrollToContact} />
 */

export function useScrollToContact() {
  const scrollToContact = () => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return scrollToContact;
}