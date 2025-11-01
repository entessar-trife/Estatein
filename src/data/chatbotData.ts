export const chatbotTexts = {
  welcomeTitle: "Hi! I’m Esty. 👋",
  welcomeMessage: "Nice to meet you. How can I assist you?",

  toggleTitle: "Chat with Esty",
  headerTitle: "Esty",
  headerSubtitle: "Intelligent Guide",

  typingLabel: "Esty • typing...",
  botLabel: (timestamp: string) => `Esty • ${timestamp}`,

  placeholder: "Ask Anything...",

  suggestedIntro: "You can try asking:",
  suggestedQuestions: [
    "How do I search for properties on Estatein?",
    "What documents do I need to sell my property through Estatein?",
    "How can I contact an Esty agent?",
  ],

  autoReplies: {
    "How do I search for properties on Estatein?":
      "To search for properties on Estatein, simply use the main search bar on our homepage. You can filter results by location, price range, property type, number of bedrooms, and more. Our advanced search system ensures you find listings that match your exact needs efficiently.",

    "What documents do I need to sell my property through Estatein?":
      "To sell your property through Estatein, you'll need the property title deed, proof of ownership, a valid government-issued ID, and any relevant legal documentation such as a sales contract or mortgage release (if applicable). Our team will guide you through each step to ensure a smooth and compliant process.",

    "How can I contact an Esty agent?":
      "You can contact an Esty agent directly through our website by using the 'Contact an Agent' form available on any property page. Alternatively, you can reach us via live chat, email, or call our support line listed in the footer. Our agents are available to assist you 7 days a week.",
  },
};