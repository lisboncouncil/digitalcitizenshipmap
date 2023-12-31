<?php declare(strict_types = 1);

namespace Drupal\citimap\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a citimap block.
 *
 * @Block(
 *   id = "citimap_header_block",
 *   admin_label = @Translation("Citimap Header Block"),
 *   category = @Translation("Custom"),
 * )
 */
final class CitimapHeaderBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    return [
      '#theme' => 'citimap_header'
    ];
  }

}
