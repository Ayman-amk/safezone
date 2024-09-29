import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import { CustomButton } from "../../components";
import { updateUserScore } from "../../lib/appwrite"; // Assume there's a function to update the score in the database.

const quizzes = {
  TSI: [
    {
      question: "What does TSI stand for?",
      options: [
        "Technical Systems Institute",
        "Transmissible Sexual Infections",
        "Tropical Scientific Index",
        "Time Series Interval",
      ],
      answer: "Transmissible Sexual Infections",
    },
    {
      question: "Which of the following is a TSI?",
      options: ["Diabetes", "HIV", "Asthma", "Hypertension"],
      answer: "HIV",
    },
    {
      question: "What is the most effective way to prevent TSI transmission?",
      options: [
        "Washing hands",
        "Avoiding crowds",
        "Using protection during sex",
        "Taking antibiotics",
      ],
      answer: "Using protection during sex",
    },
    {
      question: "Which is a common symptom of TSIs?",
      options: ["Headache", "Sore throat", "Genital sores", "Vision loss"],
      answer: "Genital sores",
    },
    {
      question: "Can TSIs be asymptomatic?",
      options: [
        "Yes, always",
        "No, never",
        "Yes, sometimes",
        "Only in severe cases",
      ],
      answer: "Yes, sometimes",
    },
  ],
  HIV: [
    {
      question: "What does HIV stand for?",
      options: [
        "Human Infectious Virus",
        "Human Immunodeficiency Virus",
        "Health Information Virus",
        "Human Intermediary Virus",
      ],
      answer: "Human Immunodeficiency Virus",
    },
    {
      question: "HIV affects which system?",
      options: ["Digestive", "Respiratory", "Immune", "Skeletal"],
      answer: "Immune",
    },
    {
      question: "Which of the following is a method of HIV transmission?",
      options: [
        "Airborne",
        "Direct contact",
        "Mosquito bites",
        "Unprotected sex",
      ],
      answer: "Unprotected sex",
    },
    {
      question: "Is there a cure for HIV?",
      options: ["Yes", "No", "Only for children", "Only for adults"],
      answer: "No",
    },
    {
      question: "HIV primarily targets which cells?",
      options: [
        "Red blood cells",
        "White blood cells",
        "Nerve cells",
        "Liver cells",
      ],
      answer: "White blood cells",
    },
  ],
};

const Create = () => {
  const { user } = useGlobalContext();
  const [selectedQuiz, setSelectedQuiz] = useState(null); // To track which quiz is selected
  const [answers, setAnswers] = useState({}); // To store user responses
  const [submitting, setSubmitting] = useState(false);

  // Function to handle answer selection
  const handleAnswerSelect = (question, option) => {
    setAnswers({ ...answers, [question]: option });
  };

  // Function to calculate the score and update in the database
  const submitQuiz = async () => {
    if (!selectedQuiz) return Alert.alert("Select a quiz first!");

    let score = 0;
    const quizQuestions = quizzes[selectedQuiz];

    // Calculate score
    quizQuestions.forEach((q) => {
      if (answers[q.question] === q.answer) score += 2;
    });

    setSubmitting(true);
    try {
      await updateUserScore(user.$id, score); // Assuming `updateUserScore` updates the user's score in the Appwrite database.
      Alert.alert("Success", `Your score for ${selectedQuiz} quiz: ${score}`);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Quiz Page</Text>

        {/* Quiz Selection */}
        <View className="mt-6">
          <Text className="text-xl text-white">Choose a Quiz</Text>
          <View className="mt-4 flex-row space-x-4">
            {Object.keys(quizzes).map((quiz) => (
              <TouchableOpacity
                key={quiz}
                className={`px-4 py-2 rounded-lg ${
                  selectedQuiz === quiz ? "bg-blue-600" : "bg-gray-600"
                }`}
                onPress={() => setSelectedQuiz(quiz)}
              >
                <Text className="text-white">{quiz}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quiz Questions */}
        {selectedQuiz && (
          <View className="mt-6">
            <Text className="text-xl text-white">
              Questions for {selectedQuiz}
            </Text>
            {quizzes[selectedQuiz].map((q, index) => (
              <View key={index} className="mt-4">
                <Text className="text-lg text-gray-200">{q.question}</Text>
                <View className="mt-2">
                  {q.options.map((option) => (
                    <TouchableOpacity
                      key={option}
                      className={`py-2 px-3 my-1 rounded-md ${
                        answers[q.question] === option
                          ? "bg-green-600"
                          : "bg-gray-700"
                      }`}
                      onPress={() => handleAnswerSelect(q.question, option)}
                    >
                      <Text className="text-white">{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Submit Button */}
        {selectedQuiz && (
          <CustomButton
            title="Submit Quiz"
            handlePress={submitQuiz}
            containerStyles="mt-6"
            isLoading={submitting}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
