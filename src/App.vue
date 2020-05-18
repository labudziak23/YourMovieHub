<template>
  <div id="app">
    <v-app id="inspire">

      <v-toolbar :style="{'background-image':`${background}`}" src="https://www.ecopetit.cat/wpic/mpic/43-437293_2560x1600-black-abstract-wallpaper-for-iphone-data-high.jpg">
        <v-title class="white--text" > YOURMOVIEHUB</v-title>
        <v-btn depressed large class="light-blue white--text btn btn-outline-primary mr-1 hidden-md-and-up" text v-on="on" @click="signUpSmallMenu = true" >Menu</v-btn>
        <v-btn depressed large class="light-blue white--text btn btn-outline-primary mr-1 hidden-md-and-up" text v-on="on" @click="searchSmallMenu = true" v-if="isAuthenticated">Wyszukaj</v-btn>
        <template v-if="isAuthenticated">

          <v-btn depressed large class="light-blue white--text btn btn-outline-primary mr-1 hidden-sm-and-down" v-on:click="searchOnlyMovies">FILMY</v-btn>
          <v-btn depressed large class="light-blue white--text btn btn-outline-primary mr-1 hidden-sm-and-down" v-on:click="searchSerials">SERIALE</v-btn>
          <v-btn depressed large class="light-blue white--text btn btn-outline-primary mr-1 hidden-sm-and-down" v-on:click="loadRandom">POLECANE</v-btn>
          <v-btn depressed large class="light-blue white--text btn btn-outline-primary mr-1 hidden-sm-and-down" v-on:click="loadStayHome">#ZOSTAŃ W DOMU</v-btn>

          <input class="white--text hidden-sm-and-down" type="text" v-model="searchKey" placeholder="Wyszukaj film,serial"/>
          <v-btn depressed large class="light-blue white--text hidden-sm-and-down" v-on:click="searchMovies">Szukaj</v-btn>
        </template>
        <template v-else>
          <v-spacer></v-spacer>
          <v-dialog dark v-model="signUpDialog" persistent max-width="600px" @save.prevent="onSignup">
            <template v-slot:activator="{ on }">
              <v-btn depressed large class="light-blue white--text btn btn-outline-primary mr-1 hidden-sm-and-down" text v-on="on" >Zarejestruj się</v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">Zarejestruj się</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                              label="E-Mail"
                              type="email"
                              id="signUpEmail"
                              v-model="signUpEmail"
                              required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                              label="Wybierz hasło"
                              type="password"
                              id="signUpPassword"
                              v-model="signUpPassword"
                              required
                              :rules="[passwordLength]"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                              label="Potwierdź hasło"
                              type="password"
                              id="confirmPassword"
                              v-model="confirmPassword"
                              :rules="[comaprePasswords]" ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="signUpDialog = false">Zamknij</v-btn>
                <v-btn color="blue darken-1" text @click="signUpDialog = false, onSignup()" type ="submit">Zarejestruj</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog dark v-model="logInDialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn depressed large class="light-blue white--text btn btn-outline-primary mr-1 hidden-sm-and-down" text v-on="on">Zaloguj się</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Zaloguj się</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                              label="Email"
                              type="email"
                              id="logInEmail"
                              v-model="logInEmail"
                              required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                              label="Hasło"
                              type="password"
                              id="logInPassword"
                              v-model="logInPassword"
                              required></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed large  class="light-blue white--text btn btn-outline-primary mr-1" text @click="logInDialog = false">Zamknij</v-btn>
                <v-btn depressed large  class="light-blue white--text btn btn-outline-primary mr-1" text @click="logInDialog = false , onLogin()">Zaloguj</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <v-dialog dark v-model="commentDialog" persistent max-width="600px" @save.prevent="onSignup">
          <v-card>
            <v-card-title>
              <span class="headline">Komentarze</span>
            </v-card-title>
            <v-card-text>
              <v-flex d-flex>
                <v-layout wrap>
                  <v-flex md10 v-for="item in commentsForCurrent" :key="item.user">
                    <v-row>
                      <v-card>
                        <v-card-title>
                          <span class="headline">{{ item.user }}</span>
                        </v-card-title>
                        <span class="card-container">
                          {{ item.content }}
                        </span>
                      </v-card>
                    </v-row>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                            label="Komentarz"
                            type="comment"
                            id="comment"
                            v-model="comment"
                            required></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn depressed large class="light-blue white--text btn btn-outline-primary mr-1" text @click="commentDialog = false">Zamknij</v-btn>
              <v-btn depressed large class="light-blue white--text btn btn-outline-primary mr-1" text @click="onComment()" type ="submit">Skomentuj</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>



        <v-icon depressed large class="white--text hidden-sm-and-down" v-if="isAuthenticated">mdi-account</v-icon>
        <span depressed large class="white--text hidden-sm-and-down" v-if="isAuthenticated">Witaj, {{user.split("@")[0]}}</span>
        <div class="mx-2"></div>
        <v-btn depressed large class="light-blue white--text btn btn-outline-primary mr-1  hidden-sm-and-down" text v-if="isAuthenticated" @click="onLogOut()">Wyloguj się</v-btn>

      </v-toolbar>
      <body style="background-color: #010105;">

      <div class="row" v-if="isAuthenticated">
        <span class="border border-blue"></span>
        <v-dialog dark v-model="InfoDialog" max-width="1000px">
          <v-btn depressed large class="light-blue white--text" style="min-width:1000px">Opis Filmu</v-btn>
          <v-card>
            <v-card-text>
              <v-container >
                {{current.Plot}}
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-rating
                      v-model="rating"
                      :length="length"
                      :empty-icon="emptyIcon"
                      :full-icon="fullIcon"
                      :half-icon="halfIcon"
                      :half-increments="halfIncrements"
                      :hover="hover"
                      :readonly="readonly"
                      :size="size"
                      :dense="dense"
                      :color="color"
                      :background-color="bgColor"
              ></v-rating>
              <div class="title grey--text" style="color: darkgray">Średnia ocena: {{meanRating}}/5</div>
              <v-spacer></v-spacer>
              <v-btn depressed large class="light-blue white--text btn btn-outline-primary mr-1" text @click="commentDialog = true">Komentarze</v-btn>
              <v-btn depressed large class="light-blue white--text btn btn-outline-primary mr-1" text @click="InfoDialog = false, rateMovie()">Zamknij</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <div class="row" style="margin:5px; float: left; border:5px solid;">
          <div v-for="(movie, movieKey) in moviesList.Search" :key="movieKey" v-bind:class="{'selected':current === movie}" v-on:click="setCurrent(movie)" >
            <div class="column">
              <v-img class="mdi-image" style="width: 100%;" v-bind:src="movie.Poster" @click="InfoDialog = true"></v-img>
              <div id="toSelect" class="title white--text" style="color: darkgray">{{movie.Title}}</div>
            </div>
          </div>
        </div>
      </div>
      </body>

      <v-footer class="pa-3" color="#000000" dark fixed>
        <v-spacer></v-spacer>
        <div>&copy; {{ new Date().getFullYear()}} </div>

        <v-spacer></v-spacer>
      </v-footer>

    </v-app>
  </div>


</template>

<script>
  export default {
    name: 'App',
    mounted:function(){
      this.loadRandom()
    },
    data () {
      return {
        emptyIcon: 'mdi-star-outline',
        fullIcon: 'mdi-star',
        halfIcon: 'mdi-star-half-full',
        halfIncrements: true,
        hover: true,
        length: 5,
        rating: 0,
        currentRating: 0,
        readonly: false,
        size: 64,
        dense: false,
        color: 'light-blue',
        colors: [
          'primary',
          'warning',
          'green',
          'red',
          'blue',
          'error',
          'teal',
          'light-blue',
        ],
        bgColor: 'grey lighten-1',
        bgColors: [
          'grey lighten-2',
          'warning lighten-1',
          'green lighten-2',
          'red lighten-2',
          'grey',
          '#eee',
          'cyan lighten-2',
          'grey lighten-1',
        ],
        signUpEmail: '',
        signUpPassword: '',
        confirmPassword: '',
        logInEmail: '',
        logInPassword: '',
        comment: '',
        signUpDialog: false,
        logInDialog: false,
        signUpSmallMenu: false,
        searchSmallMenu: false,
        commentDialog: false,
        InfoDialog: false,
        films: [],
        search:'',
        rate: 0,
        count:0,
        background: 'url(https://www.bu.edu/files/2020/02/Oscar-Predictions-Posters.jpg)',
        posters: 'url(https://www.bu.edu/files/2020/02/Oscar-Predictions-Posters.jpg)',
        searchKey:'',
        moviesList:[],
        randomkeywords:['Godzilla','Superman','naruto','Iron Man','Guardians'],
        randomSerials:['friends', 'Mother'],
        randomMovies:['Superman','Batman','Avengers','Iron man','X-men','Fast and furious'],
        randomStayHome:['Bleach','life'],
        current: [],
        commentsForCurrent: [],
      }
    },
    computed: {
      comaprePasswords () {
        return this.signUpPassword !== this.confirmPassword ? 'Hasła różnią się.' : true
      },
      passwordLength () {
        return this.signUpPassword.length  < 6 ? 'Hasło musi posiadać co najmniej 6 znaków.' : true
      },
      user () {
        return this.$store.getters.user
      },
      isAuthenticated() {
        return this.$store.getters.isAuthenticated
      },
      commentsFromDB() {
        return this.$store.getters.loadedComments
      },
      ratingsFromDB() {
        return this.$store.getters.loadedRatings
      },
      meanRating(){
        return (this.rate/this.count).toFixed(2)
      },
    },
    watch: {
      user (value) {
        if(value !== null && value !== undefined) {
          this.background = '';
        }
      }
    },
    methods: {
      onComment(){
        this.$store.dispatch('createComment', {content: this.comment, movie: this.current.Title}).then(()=>
        {
          const newComment = {
            content: this.comment,
            movie: this.current.Title,
            user: this.user
          }
          this.commentsForCurrent.push(newComment)
          this.comment = ""

        })
      },
      onSignup () {
        this.$store.dispatch('signUserUp', {email: this.signUpEmail, password: this.signUpPassword}).then(()=>
        {
          this.signUpEmail = "",
                  this.signUpPassword = "",
                  this.confirmPassword = "",
                  this.signUpSmallMenu = false
        })
      },
      onLogin () {
        this.$store.dispatch('logUserIn', {email: this.logInEmail, password: this.logInPassword}).then(()=>
        {
          this.logInEmail = "",
                  this.logInPassword = "",
                  this.signUpSmallMenu = false
        })
      },
      onLogOut() {
        this.$store.dispatch('logUserOut').then(()=>
        {
          this.background = this.posters,
                  this.signUpSmallMenu = false
        })
        this.$store.dispatch('LogUserIn', {email: this.logInEmail, password: this.logInPassword})
      },
      searchMovies()
      {
        var url = 'http://www.omdbapi.com/?s=' + this.searchKey + '&apikey=8dc936a1&';
        fetch(url)
                .then(response=>response.json())
                .then(data=>{
                  this.moviesList=data;
                })
        this.signUpSmallMenu = false
      },
      loadRandom()
      {
        const randomElement = this.randomkeywords[Math.floor(Math.random() * this.randomkeywords.length)];
        var url = 'http://www.omdbapi.com/?s=' + randomElement + '&apikey=8dc936a1&';
        fetch(url)
                .then(response=>response.json())
                .then(data=>{
                  this.moviesList=data;
                })
        this.signUpSmallMenu = false
      },
      setCurrent(movie)
      {
        var url = 'http://www.omdbapi.com/?i=' + movie.imdbID + '&apikey=8dc936a1&';
        fetch(url)
                .then(response=>response.json())
                .then(data=>{
                  this.current=data;
                  this.setCommentsForCurrent();
                  this.setRatingForCurrent();
                  this.rate = 0
                  this. count = 0
                  this.calculateRateForCurrent()
                })
      },
      searchOnlyMovies()
      {
        const randomElement = this.randomMovies[Math.floor(Math.random() * this.randomMovies.length)];
        var url = 'http://www.omdbapi.com/?s=' + randomElement + '&apikey=8dc936a1&type=movie';
        fetch(url)
                .then(response=>response.json())
                .then(data=>{
                  this.moviesList=data;
                })
        this.signUpSmallMenu = false
      },
      searchSerials() {
        const randomElement = this.randomSerials[Math.floor(Math.random() * this.randomSerials.length)];
        var url = 'http://www.omdbapi.com/?s=' + randomElement + '&apikey=8dc936a1&type=series';
        fetch(url)
                .then(response => response.json())
                .then(data => {
                  this.moviesList = data;
                })
        this.signUpSmallMenu = false
      },
      loadStayHome()
      {
        const randomElement = this.randomStayHome[Math.floor(Math.random() * this.randomStayHome.length)];
        var url = 'http://www.omdbapi.com/?s=' + randomElement + '&apikey=8dc936a1&';
        fetch(url)
                .then(response=>response.json())
                .then(data=>{
                  this.moviesList=data;
                })
        this.signUpSmallMenu = false
      },
      rateMovie(){
        if(this.rating !== 0 && this.rating !== this.currentRating) {
          this.$store.dispatch('addRating', {rating: this.rating, movie: this.current.Title}).then(()=>
          {
            this.rating = 0
          })
        }
      } ,
      setRatingForCurrent() {
        for (let i=0;i<this.ratingsFromDB.length;i++){
          if(this.ratingsFromDB[i].movie === this.current.Title && this.ratingsFromDB[i].user === this.user)
          {
            this.rating = this.ratingsFromDB[i].rating
            this.currentRating = this.ratingsFromDB[i].rating
          }
        }
      },
      setCommentsForCurrent(){
        this.commentsForCurrent = []
        for (let i=0;i<this.commentsFromDB.length;i++){
          if(this.commentsFromDB[i].movie == this.current.Title)
          {
            console.log(this.commentsFromDB[i].movie)
            this.commentsForCurrent.push(this.commentsFromDB[i])
          }
        }
      },
      calculateRateForCurrent(){
        for (let i=0;i<this.ratingsFromDB.length;i++){
          if(this.ratingsFromDB[i].movie === this.current.Title)
          {
            this.rate += this.ratingsFromDB[i].rating
            this.count += 1
          }
        }
        if(this.count === 0){
          this.count = 1
        }
      }
    }
  }
</script>

<style>
  .row {
    display: flex;
    display: inline-block
  }
  .column {
    flex: 10%;
    padding: 5px;
    text-align: center;
  }
</style>