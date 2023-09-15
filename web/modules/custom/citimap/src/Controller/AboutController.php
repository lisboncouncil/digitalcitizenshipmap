<?php
namespace Drupal\citimap\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Provides route responses for the Example module.
 */
class AboutController extends ControllerBase {

  /**
   * Returns a simple page.
   *
   * @return array
   *   A simple renderable array.
   */
  public function page() {
    return [
        '#theme' => 'about',
        '#data' => []
      ];
    }

}
