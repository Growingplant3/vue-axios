<template>
  <div>
    <h3>掲示板に投稿する</h3>
    <label for='name'>ニックネーム：</label>
    <input
      id='name'
      type='text'
      v-model='name'
    >
    <br><br>
    <label for='comment'>コメント：</label>
    <textarea
      id='comment'
      v-model='comment'
    ></textarea>
    <br><br>
    <button @click='createComment'>コメントをサーバーに送る</button>
    <h2>掲示板</h2>
    <div v-for='post in posts' :key="post.name">
      <div>名前： {{ post.fields.name.stringValue }} </div>
      <div>コメント： {{ post.fields.comment.stringValue }} </div>
      <br>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import axios from './axios-auth';

export default {
  data() {
    return {
      name: '',
      comment: '',
      posts: [],
    };
  },
  created() {
    axios.get( // getの引数は2つ(url, 追加の設定)
      '/comments',
    )
    .then(res => {
      this.posts = res.data.documents;
    });
    // }).catch(error => {}); catchで例外を受け取る
  },
  methods: {
    createComment() {
      // axiosはPromiseを返す = 非同期処理 
      axios.post( // postの引数は3つ(firebaseサーバーのurl, postするコメント/data, 追加の設定)
        '/comments',
        {
          fields: {
            name: {
              stringValue: this.name
            },
            comment: {
              stringValue: this.comment
            }
          }
        }
      );
      // .then(res => {
      //   console.log(res); 正常動作時処理
      // })
      // .catch(err => {
      //   console.log(err); 例外発生時処理
      // });
      this.name = '';
      this.comment = '';
    }
  }
};
</script>
