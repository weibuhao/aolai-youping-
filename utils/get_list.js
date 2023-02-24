import {
  getGoodsList
} from '@/api/homeAPI.js'

export const getList = async (that, tabsID) => {
  that.page++;
    
  if (that.commodityList.length !== 0 && Math.ceil(that.total / 4) < that.page) {
     that.$nextTick(() => uni.$emit('loadSwiper'),200);
     return that.status = 'nomore';
  }
  that.status = 'loading';
  const { 
    data: res
  } = await getGoodsList(tabsID, that.page);
  that.commodityList.push(...res.data);
  that.$nextTick(() => uni.$emit('loadSwiper'),500);
  that.total = res.total;
}
