<?php declare(strict_types = 1);

namespace Drupal\citimap\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a citimap filter block block.
 *
 * @Block(
 *   id = "citimap_filter_block",
 *   admin_label = @Translation("Citimap Filter Block"),
 *   category = @Translation("Custom"),
 * )
 */
class CitimapInitiativeFilterBlock extends BlockBase {


  /**
   * {@inheritdoc}
   */
  public function build(): array {
    return [
      '#theme' => 'citimap_initiative_filter',
      '#attached' => array(
        'library' => array(
          'citimap/initiative-filter-react',
        )
        ),
      '#data' => []
    ];
  }

}
