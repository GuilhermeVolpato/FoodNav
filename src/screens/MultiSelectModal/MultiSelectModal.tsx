import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Button } from 'react-native';
import Modal from 'react-native-modal';

interface MultiSelectModalProps {
  options: { name: string, nameToShow: string, category: string }[];
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
  isVisible: boolean;
  toggleModal: () => void;
}

const MultiSelectModal: React.FC<MultiSelectModalProps> = ({
  options,
  selectedOptions,
  setSelectedOptions,
  isVisible,
  toggleModal,
}) => {
  const groupedPreferences = options.reduce((groups, item) => {
    if (!groups[item.category]) {
      groups[item.category] = [];
    }
    groups[item.category].push(item);
    return groups;
  }, {} as Record<string, { name: string, nameToShow: string, category: string }[]>);

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={toggleModal} style={styles.modal}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Escolha suas preferências alimentares</Text>
        <ScrollView style={styles.modalContent}>
          {Object.keys(groupedPreferences).map((category) => (
            <View key={category}>
              <Text style={styles.categoryTitle}>{category}</Text>
              <View style={styles.optionsContainer}>
                {groupedPreferences[category].map((option) => (
                  <TouchableOpacity
                    key={option.name}
                    style={[
                      styles.optionButton,
                      selectedOptions.includes(option.name) && styles.selectedOptionButton,
                    ]}
                    onPress={() => toggleOption(option.name)}
                  >
                    <Text>{option.nameToShow}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
        <Button title="Fechar" onPress={toggleModal} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalContent: {
    width: "100%",
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  optionButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  selectedOptionButton: {
    backgroundColor: "#add8e6",
  },
});

export default MultiSelectModal;
