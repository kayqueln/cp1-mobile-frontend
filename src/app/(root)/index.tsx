import { StyleSheet } from "react-native";

import { PrimaryButton } from "@/src/components/shared/Button";
import StyledInput from "@/src/components/shared/Input";
import { useTasks } from "@/src/contexts/TaskContext";
import { FontAwesome } from "@expo/vector-icons";
import { Box } from "native-base";
import React, { useState } from "react";
import TaskList from "./components/TaskList";

export default function TasksScreen() {
  const { addTask } = useTasks();

  const [taskValue, setTaskValue] = useState("");

  const handleAddNewTask = () => {
    addTask(taskValue);
    setTaskValue("");
  };

  return (
    <Box style={styles.container}>
      <Box style={styles.newTaskContainer}>
        <StyledInput
          value={taskValue}
          onChangeText={(text) => setTaskValue(text)}
          label="Tarefa"
        />

        <PrimaryButton
          onPress={handleAddNewTask}
          rightIcon={<FontAwesome name="plus" color={"white"} />}
        >
          Criar tarefa
        </PrimaryButton>
      </Box>

      <TaskList />
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },

  newTaskContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
