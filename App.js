import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';

const App = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [curso, setCurso] = useState('');
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoAEditarIndex, setAlumnoAEditarIndex] = useState(null); // Guardamos el índice del alumno que estamos editando

  const agregarOEditarAlumno = () => {
    if (alumnoAEditarIndex !== null) {
      // Estamos en modo edición
      const nuevosAlumnos = [...alumnos];
      nuevosAlumnos[alumnoAEditarIndex] = { nombre, apellido, edad, curso };
      setAlumnos(nuevosAlumnos);
      setAlumnoAEditarIndex(null); // Salimos del modo edición
    } else {
      // Estamos agregando un nuevo alumno
      setAlumnos([...alumnos, { nombre, apellido, edad, curso }]);
    }
    // Limpiar formularios después de agregar o editar
    setNombre('');
    setApellido('');
    setEdad('');
    setCurso('');
  };

  const iniciarEdicion = (index) => {
    setAlumnoAEditarIndex(index);
    const alumno = alumnos[index];
    setNombre(alumno.nombre);
    setApellido(alumno.apellido);
    setEdad(alumno.edad);
    setCurso(alumno.curso);
  };

  const borrarAlumno = (index) => {
    const nuevosAlumnos = [...alumnos];
    nuevosAlumnos.splice(index, 1);
    setAlumnos(nuevosAlumnos);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
        style={styles.input}
      />
      <TextInput
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Curso"
        value={curso}
        onChangeText={setCurso}
        style={styles.input}
      />
      <Button title={alumnoAEditarIndex !== null ? "Guardar Edición" : "Agregar"} onPress={agregarOEditarAlumno} />

      <FlatList
        data={alumnos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.alumnoItem}>
            <Text>{`${item.nombre} ${item.apellido}`}</Text>
            <TouchableOpacity onPress={() => iniciarEdicion(index)}>
              <Text>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => borrarAlumno(index)}>
              <Text>Borrar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginHorizontal: 16,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    width: 200, 
  },
  alumnoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
});

export default App;
