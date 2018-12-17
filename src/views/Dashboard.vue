<template>
    <div class="dashboard">
        <h1 class="subheading grey--text text-xs-center mt-5">Dashboard</h1>

        <v-container class="my-4">
            <v-layout row class="mb-3">
                <v-tooltip top>
                    <v-btn small flat color="grey"  @click="sortBy('title')" slot="activator">
                        <v-icon left small>folder</v-icon>
                        <span class="caption text-lowercase">By project name</span>
                    </v-btn>    
                    <span>Sort by project name</span>
                </v-tooltip>
                <v-tooltip top>
                    <v-btn small flat color="grey" @click="sortBy('person')" slot="activator">
                        <v-icon left small>person</v-icon>
                        <span class="caption text-lowercase">By person</span>
                    </v-btn>  
                    <span>Sort by project author</span>
                 </v-tooltip>   
            </v-layout>

            <v-card flat v-for="project in projects" :key="project.title">
                <v-layout row wrap :class="`pa-3 project ${project.status}`">
                    <v-flex xs12 md6>
                        <div class="caption grey--text">Project title</div>
                        <div>{{ project.title }}</div>
                    </v-flex>

                    <v-flex xs6 sm4 md2>
                        <div class="caption grey--text">Person</div>
                        <div>{{ project.person }}</div>
                    </v-flex>

                    <v-flex xs6 sm4 md2>
                        <div class="caption grey--text">Due by</div>
                        <div>{{ project.due }}</div>
                    </v-flex>

                    <v-flex xs2 sm4 md2>
                        <div class="right">
                            <v-chip small :class="`${project.status} white--text my-2 caption`">{{ project.status }}</v-chip>
                        </div>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
            </v-card>
        </v-container>
        
    </div>
</template>

<script>
    import db from '@/fb';

    export default {
        data() {
            return {
                projects: []
            }
        },
        methods: {
            sortBy(prop) {
                this.projects.sort((a,b) => a[prop] < b[prop] ? -1 : 1) 
            }
        },
        created() {
            db.collection('projects').onSnapshot(res => {
                const changes = res.docChanges()

                changes.forEach(change => {
                    if(change.type === 'added') {
                        this.projects.push({ 
                            ...change.doc.data(),  //takes all properties and spreads them into an object for each
                            id: change.doc.id     //id from the store
                        }) 
                    }
                })
            })         
        }
    }
</script>

<style>
.project.complete {
    border-left: 4px solid #6ca78c; 
}
.project.ongoing {
     border-left: 4px solid #ECB866
}
.project.overdue {
    border-left: 4px solid #e25021;
}
.v-chip.complete {
    background: #6ca78c;
}
.v-chip.ongoing {
    background: #ECB866;
}
.v-chip.overdue{ 
    background: #e25021;
}

</style>
