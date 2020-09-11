import React, {useState} from 'react';
import {Text, View, TouchableOpacity, FlatList, Button, StyleSheet} from 'react-native';

const list = [
    {
        title: 'New Post',
        text: 'this is a testing post.',
        comments: [
            {comment: 'Hi there'},
        ]
    }
]

function Wall(props) {
    const {navigation} = props;
    const [postList, setPostList] = useState([...list]);

    const onSave = React.useCallback((post) => {
        console.log(post);
        setPostList(list => {
            list.push({...post, comments: []});
            return [...list];
        });
    }, []);

    const onSaveComment = React.useCallback((comment, index) => {
        setPostList(list => {
            const comments = list[index].comments;
            comments.push({comment});
            list[index] = {...list[index], comments};
            return [...list];
        });
    }, []);
    
    function gotoForm() {
        navigation.push('Form', {
            onSave
        })
    }

    function viewPost(post, i) {
        navigation.push('PostView', {
            post,
            i,
            onSaveComment,
        });
    }

    function renderItem(item) {
        console.log(item);
        return (
            <TouchableOpacity style={styles.postView} onPress={() => viewPost(item)}>
                <View >
                    <Text style={styles.postTitle}>{item.title}</Text>
                    <Text>{item.text}</Text>
                </View>
                <View style={styles.actionView}>
                    {/* <Button title="Share" onPress={() => console.log('share')} /> */}
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{position: 'relative', height: '100%'}}>
            <FlatList
                data={postList}
                renderItem={({item}) => renderItem(item)}
                keyExtractor={(item, index) => `${index}`}
            />
            <Button title="New Post" style={styles.newButton} onPress={() => gotoForm()} />
        </View>
    )
}

const styles = StyleSheet.create({
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
    newButton: {
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    }
});

export default Wall;
