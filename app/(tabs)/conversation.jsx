import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Conversation = () => {
  // Define states for conversation flow
  const [stage, setStage] = useState("greeting"); // Initial stage: greeting, subTopics, answer
  const [selectedTopicKey, setSelectedTopicKey] = useState(null); // Tracks the main topic key (STI, HIV, etc.)
  const [selectedSubQuestion, setSelectedSubQuestion] = useState(null); // Tracks the selected sub-question

  // Define main topic options and their corresponding keys
  const topics = [
    { key: "STI", label: "Tell me about Sexually Transmitted Infection (STI)" },
    {
      key: "HIV",
      label:
        "Can you provide more information about Human Immunodeficiency Virus (HIV)?",
    },
    {
      key: "AIDS",
      label: "What is Acquired Immunodeficiency Syndrome (AIDS)?",
    },
    {
      key: "PUB",
      label: "What is Puberty?",
    },
  ];

  // Define responses and sub-field options
  const subFields = {
    STI: [
      "What are common symptoms of STIs?",
      "How can STIs be prevented?",
      "What are the treatment options for STIs?",
    ],
    HIV: [
      "How is HIV transmitted?",
      "What are the stages of HIV infection?",
      "How can HIV be managed?",
    ],
    AIDS: [
      "What are the symptoms of AIDS?",
      "How does HIV progress to AIDS?",
      "What are the treatment options for AIDS?",
    ],
    PUB: [
      "What is puberty?",
      "How does puberty occur?",
      "What are the signs and symptoms of puberty?",
    ],
  };

  // Answers corresponding to each sub-question for STI
  const answers = {
    "What are common symptoms of STIs?":
      "يمكن أن تختلف أعراض الأمراض المنقولة جنسياً اعتمادًا على النوع، ولكن الأعراض الشائعة تشمل الإفرازات غير الطبيعية من الأعضاء التناسلية، الألم أثناء التبول، القروح أو النتوءات على الأعضاء التناسلية، الحكة، والألم أثناء الجماع. قد لا تظهر بعض الأمراض المنقولة جنسياً، مثل الكلاميديا والسيلان، أي أعراض خاصةً في المراحل المبكرة",
    "How can STIs be prevented?":
      "STIs can be prevented by using condoms consistently and correctly during sexual intercourse, limiting the number of sexual partners, and getting vaccinated against certain STIs like HPV and hepatitis B. Regular STI screening is also crucial, especially if you have multiple partners or are entering a new relationship.",
    "What are the treatment options for STIs?":
      "Les options de traitement dépendent du type d'IST. Les infections bactériennes telles que la chlamydia, la gonorrhée et la syphilis peuvent généralement être traitées avec des antibiotiques. Les IST virales comme l'herpès et le VIH ne peuvent pas être guéries, mais les médicaments antiviraux peuvent aider à gérer les symptômes et à réduire le risque de transmission. Un diagnostic et un traitement précoces sont essentiels pour prévenir les complications.",
  };

  // Render options using a dynamic function
  const renderOptions = (options, onSelect) =>
    options.map((option, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => onSelect(option)}
        className="my-2 p-4 rounded-md bg-secondary hover:bg-secondary-100"
      >
        <Text className="text-lg text-black-100 font-pmedium">
          {option.label || option}
        </Text>
      </TouchableOpacity>
    ));

  return (
    <SafeAreaView className="px-6 py-8 bg-primary h-full">
      <ScrollView className="space-y-8">
        {/* App Title */}
        <View className="pb-4 border-b border-gray-100">
          <Text className="text-4xl text-secondary font-pextrabold">
            Dr. Know It All
          </Text>
        </View>

        {/* Stage: Greeting */}
        {stage === "greeting" && (
          <View>
            <Text className="text-2xl text-gray-100 font-pextralight">
              Hi there! Do you want to learn something new?
            </Text>
            <View className="mt-6 space-y-4">
              {renderOptions(topics, (topic) => {
                setSelectedTopicKey(topic.key); // Set key for the selected topic
                setStage("subTopics"); // Move to the subTopics stage
              })}
            </View>
          </View>
        )}

        {/* Stage: Sub-Topics */}
        {stage === "subTopics" && (
          <View>
            <Text className="text-2xl text-secondary-200 font-pregular">
              {`Great! Let's talk about "${
                topics.find((t) => t.key === selectedTopicKey).label
              }". Choose a specific question to learn more.`}
            </Text>
            <View className="mt-6 space-y-4">
              {renderOptions(subFields[selectedTopicKey], (subOption) => {
                setSelectedSubQuestion(subOption); // Track the sub-question selected
                setStage("answer"); // Move to the answer stage
              })}
            </View>
          </View>
        )}

        {/* Stage: Answer */}
        {stage === "answer" && selectedSubQuestion && (
          <View>
            <Text className="text-2xl text-secondary-100 font-pbold">
              {selectedSubQuestion}
            </Text>
            <Text className="mt-4 text-lg text-gray-100 font-plight">
              {answers[selectedSubQuestion]}
            </Text>
            <TouchableOpacity
              onPress={() => setStage("subTopics")} // Go back to sub-topic stage
              className="mt-6 p-4 rounded-md bg-secondary hover:bg-secondary-200"
            >
              <Text className="text-lg text-black-100 font-pmedium">
                Go Back
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Conversation;
