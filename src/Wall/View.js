import React, {useState} from 'react';
import {Text, View, TouchableOpacity, FlatList, TextInput, StyleSheet, Button} from 'react-native';

function PostView(props) {
    const [comment, setComment] = useState('');
    const {navigation} = props;
    const _post = navigation.getParam("post");
    const onSaveComment = navigation.getParam("onSaveComment");
    const [post, setPost] = useState(_post);
    const index = navigation.getParam("i");

    const handleSave = React.useCallback(() => {
        // onSaveComment && onSaveComment(comment, index);
        setPost(p => {
            const comments = p.comments;
            comments.push({comment});
            return {...p, comments};
        });
        setComment('');
    }, [comment]);
    
    return (
        <View style={styles.container}>
            <View style={styles.postView}>
                <Text>{post.title}</Text>
                <Text>{post.text}</Text>
            </View>
            <FlatList
                data={post.comments}
                renderItem={({item}) => (
                    <Text style={styles.commentBox}>{item.comment}</Text>
                )}
                keyExtractor={(item, i) => `${i}`}
            />
            <View style={styles.commentView}>
                <TextInput style={{ flex: 1, }} placeholder="Comment" onChangeText={(c) => setComment(c)}/>
                <Button title="Send" onPress={handleSave} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%',
    },
    commentView: {
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    postView: {
        borderColor: '#afafaf',
        borderWidth: 1,
        padding: 20,
        margin: 10,
    },  
    postTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    commentBox: {
        padding: 10,
        borderBottomColor: '#afafaf',
        borderBottomWidth: 1,
        paddingLeft: 20,
    }
});

export default PostView;
