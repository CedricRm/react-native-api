import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMaterialDto } from './dto/create-material-dto';
import { UpdateMaterialDto } from './dto/update-material-dto';
import { Material } from './entities/material.entity';
import { MaterialState } from './interfaces/material-states-interface';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
  ) {}

  /**
   * Find all materials
   * @returns {Promise<Material[]>}
   */
  async findAll(): Promise<Material[]> {
    try {
      return (await this.materialRepository.find()) || [];
    } catch (err) {
      throw new HttpException('Internal server error', 500);
    }
  }

  /**
   * Find material by id
   * @param id id of the material
   * @returns {Promise<Material>}
   */
  async findById(id: number): Promise<Material> {
    try {
      const material = await this.materialRepository.findOneBy({ id });
      if (!material) {
        throw new Error('Material not found');
      }
      return material;
    } catch (err) {
      throw new HttpException('Internal server error', 500);
    }
  }

  /**
   * Create a new material
   * @param materialDatas new material datas : CreateMaterialDto
   * @returns {Promise<Material>}
   */
  async createMaterial(materialDatas: CreateMaterialDto): Promise<Material> {
    try {
      return await this.materialRepository.save(materialDatas);
    } catch (err) {
      throw new HttpException('Internal server error', 500);
    }
  }

  /**
   * Update material by id
   * @param id id of the material
   * @param materialDatas update value of the material: UpdateMaterialDto
   * @returns {Promise<Material>}
   */
  async UpdateMaterialById(
    id: number,
    materialDatas: UpdateMaterialDto,
  ): Promise<void> {
    try {
      await this.materialRepository.update(id, materialDatas);
    } catch (err) {
      throw new HttpException('Internal server error', 500);
    }
  }

  /**
   * Get total material stats
   * @returns {Promise<{total: number; good: number; damaging: number; bad: number;}>}
   */
  async getTotalMaterialQuantities(): Promise<{
    total: number;
    good: number;
    damaging: number;
    bad: number;
  }> {
    try {
      const materials = await this.materialRepository.find();

      let total = 0;
      let good = 0;
      let damaging = 0;
      let bad = 0;

      materials.forEach((material) => {
        total += material.quantity;
        if (material.state === MaterialState.GOOD) {
          good += material.quantity;
        } else if (material.state === MaterialState.DAMAGING) {
          damaging += material.quantity;
        } else if (material.state === MaterialState.BAD) {
          bad += material.quantity;
        }
      });

      return { total, good, damaging, bad };
    } catch (err) {
      throw new HttpException('Internal server error', 500);
    }
  }

  /**
   * Remove material by id
   * @param id id of the material
   * @returns {Promise<void>}
   */
  async deleteById(id: number): Promise<void> {
    try {
      const materialToRemove = await this.findById(id);
      if (!materialToRemove) {
        throw new Error('Material not found');
      }
      await this.materialRepository.remove(materialToRemove);
    } catch (err) {
      throw new HttpException('Internal server error', 500);
    }
  }
}
