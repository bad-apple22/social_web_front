import React, { useState } from 'react';
import { Layout, Menu, Input, Button, List, Avatar, Comment, Tooltip, Form, Modal } from 'antd';
import { LikeOutlined, LikeFilled, MessageOutlined, RetweetOutlined, SendOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Header, Content, Footer } = Layout;
const { TextArea } = Input;

interface Post {
    id: number;
    author: string;
    content: string;
    datetime: string;
    likes: number;
    comments: CommentType[];
    repost?: Post; // 新增字段
}

interface CommentType {
    author: string;
    content: string;
    datetime: string;
}

const Circle: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPostContent, setNewPostContent] = useState<string>('');
    const [newCommentContent, setNewCommentContent] = useState<string>('');
    const [repostModalVisible, setRepostModalVisible] = useState<boolean>(false);
    const [currentRepost, setCurrentRepost] = useState<Post | null>(null);
    const [repostContent, setRepostContent] = useState<string>('');

    const handleAddPost = () => {
        if (newPostContent) {
            const newPost: Post = {
                id: posts.length + 1,
                author: 'User',
                content: newPostContent,
                datetime: moment().fromNow(),
                likes: 0,
                comments: [],
            };
            setPosts([newPost, ...posts]);
            setNewPostContent('');
        }
    };

    const handleLike = (id: number) => {
        const updatedPosts = posts.map((post) => {
            if (post.id === id) {
                return { ...post, likes: post.likes + 1 };
            }
            return post;
        });
        setPosts(updatedPosts);
    };

    const handleAddComment = (postId: number) => {
        if (newCommentContent) {
            const updatedPosts = posts.map((post) => {
                if (post.id === postId) {
                    const newComment: CommentType = {
                        author: 'User',
                        content: newCommentContent,
                        datetime: moment().fromNow(),
                    };
                    return { ...post, comments: [...post.comments, newComment] };
                }
                return post;
            });
            setPosts(updatedPosts);
            setNewCommentContent('');
        }
    };

    const handleRepost = (post: Post) => {
        setCurrentRepost(post);
        setRepostModalVisible(true);
    };

    const handleAddRepost = () => {
        if (repostContent && currentRepost) {
            const newRepost: Post = {
                id: posts.length + 1,
                author: 'User',
                content: repostContent,
                datetime: moment().fromNow(),
                likes: 0,
                comments: [],
                repost: currentRepost,
            };
            setPosts([newRepost, ...posts]);
            setRepostModalVisible(false);
            setRepostContent('');
        }
    };

    return (
        <Layout className="layout">
            <Header>
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="1">Circle</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    <h2>Post something</h2>
                    <TextArea
                        rows={4}
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="What's on your mind?"
                    />
                    <Button type="primary" onClick={handleAddPost} style={{ marginTop: '10px' }}>
                        Post
                    </Button>
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={posts}
                        renderItem={(post) => (
                            <List.Item
                                key={post.id}
                                actions={[
                                    <Tooltip key="like" title="Like">
                    <span onClick={() => handleLike(post.id)}>
                      {React.createElement(post.likes > 0 ? LikeFilled : LikeOutlined)}
                        <span className="comment-action">{post.likes}</span>
                    </span>
                                    </Tooltip>,
                                    <Tooltip key="comment" title="Comment">
                    <span>
                      <MessageOutlined />
                      <span className="comment-action">{post.comments.length}</span>
                    </span>
                                    </Tooltip>,
                                    <Tooltip key="retweet" title="Retweet">
                    <span onClick={() => handleRepost(post)}>
                      <RetweetOutlined />
                    </span>
                                    </Tooltip>,
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar>{post.author[0]}</Avatar>}
                                    title={post.author}
                                    description={post.datetime}
                                />
                                {post.content}
                                {post.repost && (
                                    <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #f0f0f0', borderRadius: '4px' }}>
                                        <List.Item.Meta
                                            avatar={<Avatar>{post.repost.author[0]}</Avatar>}
                                            title={post.repost.author}
                                            description={post.repost.datetime}
                                        />
                                        {post.repost.content}
                                    </div>
                                )}
                                <Comment
                                    content={
                                        <>
                                            <Form.Item>
                                                <TextArea
                                                    rows={2}
                                                    onChange={(e) => setNewCommentContent(e.target.value)}
                                                    value={newCommentContent}
                                                    placeholder="Add a comment"
                                                />
                                            </Form.Item>
                                            <Form.Item>
                                                <Button
                                                    htmlType="submit"
                                                    onClick={() => handleAddComment(post.id)}
                                                    type="primary"
                                                    icon={<SendOutlined />}
                                                >
                                                    Add Comment
                                                </Button>
                                            </Form.Item>
                                        </>
                                    }
                                >
                                    {post.comments.map((comment, index) => (
                                        <Comment
                                            key={index}
                                            author={comment.author}
                                            content={comment.content}
                                            datetime={comment.datetime}
                                        />
                                    ))}
                                </Comment>
                            </List.Item>
                        )}
                    />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Circle ©2024 Created by Your Name</Footer>
            <Modal
                title="Repost"
                visible={repostModalVisible}
                onCancel={() => setRepostModalVisible(false)}
                onOk={handleAddRepost}
                okText="Repost"
                cancelText="Cancel"
            >
                <TextArea
                    rows={4}
                    value={repostContent}
                    onChange={(e) => setRepostContent(e.target.value)}
                    placeholder="Add a comment to your repost"
                />
            </Modal>
        </Layout>
    );
};

export default Circle;
