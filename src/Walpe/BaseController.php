<?php
/**
 * Created by LiaoLingjia.
 * Date: 16-3-30
 * Time: 下午11:06
 */

namespace Walpe;


class BaseController extends  Base
{
    /**
     * @var \Smarty
     */
    protected  $smarty;
    function __construct(){
        $this->smarty = new \Smarty();
    }
}