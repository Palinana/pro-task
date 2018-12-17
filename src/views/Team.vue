<template>
    <div class="team">
        <h1 class="subheading grey--text text-xs-center mt-5">Team</h1>
        <v-container class="my-4">
            <v-layout row wrap>
                <v-flex xs12 sm6 md 4 lg3 v-for="person in team" :key="person.name">
                    <v-card flat class="text-xs-center ma-3">
                        <v-responsive class="pt-4">
                            <v-avatar size="100">
                                <img :src="person.avatar"/>
                            </v-avatar>
                        </v-responsive>

                        <v-card-text>
                            <div class="subheading">{{ person.name }}</div>
                            <div class="grey--text">{{ person.role }}</div>
                        </v-card-text>

                        <v-card-actions class="justify-center">
                            <v-btn flat color="grey">
                                <v-icon small left>message</v-icon>
                                <span>Message</span>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>  
    import db from '@/fb';

    export default {
        data() {
            return {
                team: []
            }
        },
        created() {
            db.collection('team').onSnapshot(res => {
                const changes = res.docChanges();

                changes.forEach(change => {
                    if(change.type === 'added') {
                        this.team.push({ 
                            ...change.doc.data(),  
                            id: change.doc.id    
                        }) 
                    }
                });

                this.team.sort((a,b) => a['name'] < b['name'] ? -1 : 1); 
            })         
        }    
    }
</script>