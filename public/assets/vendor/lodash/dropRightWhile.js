var baseIteratee=require("./_baseIteratee"),baseWhile=require("./_baseWhile");function dropRightWhile(e,r){return e&&e.length?baseWhile(e,baseIteratee(r,3),!0,!0):[]}module.exports=dropRightWhile;