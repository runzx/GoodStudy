<?php
/**
 * 链式， where()是and, 其它可以在phpstorm中自动显示
 * 
 */
$article = new ArticleModel();          
        $article_list = $article->with('author0')
            ->where('recommend',1)
            ->where('title','like','%'.$keywords.'%')
            ->whereIn('category_id','11,12,13')     //SELECT * FROM `edms_article` WHERE (  `category_id` IN (11,12,13) ) AND `edms_article`.`delete_time` IS NULL
            ->whereBetween()
            ->whereExists()
            ->whereExp()
            ->whereLike()
            ->whereNotin()
            ->whereNotBetween()
            ->whereNotLike()
            ->whereNotNull()
            ->whereNotExists()
            ->whereOr()
            ->whereTime()
            ->whereXor()
            ->removeWhereField()
            ->select();