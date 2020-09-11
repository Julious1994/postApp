import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Button, TextInput, StyleSheet} from 'react-native';

function Form(props) {
    const {navigation} = props;
    const onSave = navigation.getParam('onSave');
    const [post, setPost] = useState({});

    const handleChange = React.useCallback((key, value) => {
        setPost(p => {
            return {...p, [key]: value}
        });
    }, [setPost]);

    const handleSave = React.useCallback(() => {
        onSave && onSave({...post});
        setPost({});
    }, [setPost, onSave, post]);

    return (
        <View style={styles.container}>
            <TextInput placeholder="Title" onChangeText={(value) => handleChange('title', value)} />
            <TextInput placeholder="Description" onChangeText={(value) => handleChange('text', value)} />
            <Button title="Create Post" onPress={handleSave} style={styles.button} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%',
    },
});

export default Form;
