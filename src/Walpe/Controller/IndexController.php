<?php

namespace Walpe\Controller;
use Walpe\BaseController;

/**
 * Created by LiaoLingjia.
 * Date: 16-3-30
 * Time: 下午10:59
 */
class IndexController extends  BaseController
{
    public function indexAction(){
        $this->smarty->display();
    }
}