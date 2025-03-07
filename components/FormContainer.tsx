import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";

function FormContainer({ children }: any) {
  return (
     <ScrollView  
          style={styles.formContainer}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ justifyContent : 'center' }}
      >
          <KeyboardAvoidingView 
              enabled                
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
              {children}
          </KeyboardAvoidingView>
     </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
      width: '100%',
      flex: 1,
  },
});

export default FormContainer;