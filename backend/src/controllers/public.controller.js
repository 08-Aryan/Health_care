// GET public health articles
export const getPublicArticles = async (req, res) => {
  try {
    const articles = [
      {
        id: 1,
        title: "COVID-19 Updates and Guidelines",
        description: "Latest information on COVID-19 vaccination, safety protocols, and public health guidelines.",
        url: "https://www.cdc.gov/coronavirus/2019-ncov/index.html",
        date: "2025-01-15"
      },
      {
        id: 2,
        title: "Mental Health Awareness",
        description: "Understanding mental health, reducing stigma, and accessing support services.",
        url: "https://www.mentalhealth.gov",
        date: "2025-01-10"
      },
      {
        id: 3,
        title: "Nutrition and Healthy Eating",
        description: "Evidence-based nutrition guidelines for maintaining a balanced and healthy diet.",
        url: "https://www.nutrition.gov",
        date: "2025-01-05"
      },
      {
        id: 4,
        title: "Physical Activity Guidelines",
        description: "Recommendations for physical activity to improve overall health and wellbeing.",
        url: "https://health.gov/our-work/nutrition-physical-activity",
        date: "2024-12-20"
      },
      {
        id: 5,
        title: "Sleep Health and Hygiene",
        description: "Tips and strategies for improving sleep quality and establishing healthy sleep patterns.",
        url: "https://www.sleepfoundation.org",
        date: "2024-12-15"
      }
    ];

    return res.json({ 
      success: true, 
      articles 
    });
  } catch (err) {
    console.error("Get articles error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
};
