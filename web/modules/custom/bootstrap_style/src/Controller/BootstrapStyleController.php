<?php

namespace Drupal\bootstrap_style\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Returns responses for Bootstrap Style routes.
 */
class BootstrapStyleController extends ControllerBase {

  /**
   * Builds the response.
   */
  public function build() {

    $build['content'] = [
      '#theme' => 'bootstrap_style',
    ];

    return $build;
  }

}
