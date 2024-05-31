// MultiSelectModal.tsx
import React from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';

interface MultiSelectModalProps {
  options: string[];
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
  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={toggleModal} style={styles.modal}>
      <View style={styles.modalContent}>
        <ScrollView>
          <View style={styles.optionsContainer}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  selectedOptions.includes(option) && styles.selectedOptionButton,
                ]}
                onPress={() => toggleOption(option)}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <Button title="Fechar" onPress={toggleModal} />
      </View>
    </Modal>
  );
};

export default MultiSelectModal;
