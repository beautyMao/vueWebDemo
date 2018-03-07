import lnv from '../../widget/loading/loading';
import axios from 'axios'

export default {
    name: 'index',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    methods: {
        loading() {
            lnv.pageloading();
            setTimeout(() => {
                //  lnv.destroyloading()
            }, 3000)
        }
    },
    created() {
        axios.get('http://jspang.com/DemoApi/oftenGoods.php')
            .then(response => {
                console.log(response);
            // this.oftenGoods = response.data;
            })
            .catch(error => {
                console.log(error);
                alert('网络错误，不能访问');
            })
    },
}