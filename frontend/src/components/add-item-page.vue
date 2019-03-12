<template>
    <div>
        <h2>Add an item to negociate</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" v-model="title" v-validate="'required'" name="title" class="form-control" :class="{ 'is-invalid': submitted && errors.has('title') }" />
                <div v-if="submitted && errors.has('title')" class="invalid-feedback">{{ errors.first('title') }}</div>
            </div>
            <div class="form-group">
                <label htmlFor="category">Category</label>
                <select v-model="category" name="category" class="form-control" :class="{ 'is-invalid': submitted && !category }">
                    <option v-for="option in optionsCategories" v-bind:value="option">
                        {{ option }}
                    </option>
                </select>
                <div v-show="submitted && !category" class="invalid-feedback">Category is required</div>
            </div>
            <div class="form-group">
                <label htmlFor="description">Description</label>
                <textarea v-model="description" name="description" class="form-control" :class="{ 'is-invalid': submitted && !description }"
                 rows="5" cols="33"></textarea>
                <div v-show="submitted && !description" class="invalid-feedback">Description is required</div>
            </div>
             <div class="form-group">
                <label htmlFor="condition">Condition</label>
                <select v-model="condition" name="condition" class="form-control" :class="{ 'is-invalid': submitted && !condition }">
                    <option v-for="option in optionsConditions" v-bind:value="option">
                        {{ option }}
                    </option>
                </select>
                <div v-show="submitted && !category" class="invalid-feedback">Condition is required</div>
            </div>
            <div v-if="!image" class="form-group">
                <h2>Select a picture</h2>
                <input type="file" name="image" ref="image" @change="onFileChange" accept="image/*" />
            </div>
            <div v-else>
                <img :src="image" />
                <button @click="removeImage">Remove image</button>
            </div>
            <div class="form-group">
                <button class="btn btn-primary">Create</button>
                <router-link to="/trocs" class="btn btn-link">Cancel</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    data () {
        return {
            title:'',
            category: '',
            description: '',
            image: '',
            file:'',
            condition:'',
            submitted: false,
            optionsConditions: ["Neuf","Bon état", "Passable", "Mauvais état"],
            optionsCategories: ["MULTIMÉDIA","LOISIRS","EQUIPEMENT","SERVICES","MAISON","MODE","AUTRES"]
        }
    },
    computed: {
        ...mapState('barters', ['barters'])
    },
    methods: {
        ...mapActions('barters',['createBarter']),
        handleSubmit (e) {
            this.submitted = true;
            const { title, category, description, file, condition } = this;
            //const barter = { title, category, description, file, condition };
            const formData = new FormData();
            formData.append("image", file, file.name)
            formData.append('title',title);
            formData.append('category',category);
            formData.append('description',description);
            formData.append('condition',condition);
            console.log("formData : ", formData);
            this.createBarter(formData);
            this.$router.push("/trocs");

        },
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
            this.file = files[0];
        },
        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;

            reader.onload = (e) => {
                vm.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        removeImage: function (e) {
            this.image = '';
        }
    }
};
</script>