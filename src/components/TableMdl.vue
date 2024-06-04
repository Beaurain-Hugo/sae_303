<script setup>

    import { linearData, sortCol } from '@/composables/utilsTable.js'

    const propTable = defineProps({
        title:              { type:String,              default:""              },
        fields:             { type:Object,              default:() => {}        },
        items:              { type:Object,              default:() => {}        },
        color:              { type:String,              default:"color:white;"  }
    })

    const emit = defineEmits(['filterTab'])
    const filterTab = (field) => {
        emit('tableFilter', field)
    }
</script>

<template>
    <div class="container-fluid">
        <h1 class="text">{{title}}</h1>
                <table class="table table-bordered table-striped" :style="color">
                    <thead>
                        <tr>
                            <th v-for="field in fields" :key="field" >
                                <div class="input-group-text w-100 mb-2">
                                    <span class="col-10"> {{field.label}}</span>
                                    <span class="col-2">
                                <i v-if="field.sortable" class="fa fa-sort float-right" @click="sortCol(items, field)"></i>
                            </span>
                            </div>
                            <div class="input-group">
                                <span class="input-group-text">
                                    <i class="fa fa-filter fa-sm"></i>
                                </span>
                                <input class="form-control" @input="filterTab(field)" v-model="field.filter">
                            </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items" :key="item">
                            <td v-for="field in fields" :key="field">
                                <span>{{item[field.key]}}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
</template>

<style scoped>
.text{
    color:#495057;
}
</style>