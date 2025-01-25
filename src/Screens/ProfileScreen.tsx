import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {useAuth} from '../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import Fallback from '../Components/Fallback';
import {Layout} from '../constant/layout';
// import BottomTab from './components/BottomTab';

const ProfileScreen = () => {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const {currentUser} = useAuth();

  useEffect(() => {
    const fetchTodos = async () => {
      const snapshot = await firestore().collection('todos').get();
      const todos = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      setTodoList(todos);
    };
    fetchTodos();
  }, []);

  // Add new todo to Firestore
  const handleAddTodo = async () => {
    if (!todo) {
      console.warn('Please enter a task');
      return;
    }
    const newTodo = {title: todo};
    const docRef = await firestore().collection('todos').add(newTodo);
    setTodoList([...todoList, {id: docRef.id, ...newTodo}]);
    setTodo('');
  };

  // Edit todo in Firestore
  const handleEdit = todo => {
    setEditTodo(todo);
    setTodo(todo.title);
  };

  const handleUpdateTodo = async () => {
    // Ensure editTodo is not null
    if (!editTodo) {
      console.warn('No todo selected for editing');
      return;
    }

    await firestore()
      .collection('todos')
      .doc(editTodo.id)
      .update({title: todo});

    setTodoList(
      todoList.map(item =>
        item.id === editTodo.id ? {...item, title: todo} : item,
      ),
    );
    setEditTodo(null);
    setTodo('');
  };

  // Delete todo from Firestore
  const handleDelteTodo = async id => {
    await firestore().collection('todos').doc(id).delete();
    setTodoList(todoList.filter(todo => todo.id !== id));
  };

  const renderTodos = ({item}) => (
    <View style={styles.todoContainer}>
      <View style={{flex: 1}}>
        <Text style={styles.todoText}>{item.title}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Icon name="pencil" size={20} color="white" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelteTodo(item.id)}>
          <Icon name="trash-bin" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{margin: 16}}>
      <TextInput
        style={{
          borderColor: '#1e90ff',
          borderWidth: 2,
          borderRadius: 6,
          paddingVertical: 6,
          paddingHorizontal: 16,
          color: 'black',
        }}
        placeholder="Add a task..."
        placeholderTextColor="black"
        value={todo}
        onChangeText={setTodo}
      />
      {editTodo ? (
        <TouchableOpacity onPress={handleUpdateTodo} style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleAddTodo} style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={todoList}
        renderItem={renderTodos}
        keyExtractor={item => item.id}
      />
      {todoList.length <= 0 && <Fallback />}
      {/* <BottomTab /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    // backgroundColor: '#1e90ff',
    // borderRadius: 6,
    // paddingHorizontal: 5,
    // paddingVertical: 15,
    // marginBottom: 12,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 5},
    // shadowOpacity: 1,
    // shadowRadius: 2,
    // elevation: 3,

    backgroundColor: '#1e90ff', // Keeps the original color
    borderRadius: Layout.PADDING_VERTICAL_SMALL, // Dynamic border radius
    paddingHorizontal: Layout.PADDING_HORIZONTAL_SMALL, // Horizontal padding from Layout
    paddingVertical: Layout.PADDING_VERTICAL_MEDIUM, // Vertical padding from Layout
    marginBottom: Layout.MARGIN_VERTICAL_SMALL, // Dynamic margin from Layout
    flexDirection: 'row', // Flexbox for row layout
    alignItems: 'center', // Center align items vertically
    justifyContent: 'space-between', // Space between for even distribution
    shadowColor: '#000', // Original shadow color
    shadowOffset: {
      width: 0,
      height: Layout.PADDING_VERTICAL_SMALL, // Dynamic shadow height
    },
    shadowOpacity: 1, // Original shadow opacity
    shadowRadius: Layout.PADDING_VERTICAL_SMALL, // Dynamic shadow radius
    elevation: Layout.PADDING_VERTICAL_MEDIUM * 0.4, // Adjusted elevation dynamically
  },
  todoText: {
    // color: 'white',
    // fontSize: 20,
    // fontWeight: '800',
    // flexShrink: 1,
    color: 'white', // Keeps the text color as white
    fontSize: Layout.SCREEN_WIDTH * 0.05, // Dynamic font size (5% of screen width)
    fontWeight: '800', // Original bold weight
    flexShrink: 1, // Allows text to shrink if necessary
  },
  iconContainer: {
    flexDirection: 'row',
    paddingRight: 10,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 20,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 6,
    paddingVertical: 10,
    marginTop: 24,
    marginVertical: 34,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default ProfileScreen;
