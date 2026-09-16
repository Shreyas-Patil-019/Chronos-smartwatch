import bpy
import math

# Reset/Clear existing objects in Blender scene
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# Remove unused materials & meshes
for block in bpy.data.materials:
    bpy.data.materials.remove(block)
for block in bpy.data.meshes:
    bpy.data.meshes.remove(block)

# ----------------------------------------------------
# 1. CREATE MATERIALS (PBR Setup)
# ----------------------------------------------------

# Titanium Case Material
mat_case = bpy.data.materials.new(name="Mat_TitaniumCase")
mat_case.use_nodes = True
nodes_case = mat_case.node_tree.nodes
bsdf_case = nodes_case.get("Principled BSDF")
bsdf_case.inputs["Base Color"].default_value = (0.07, 0.07, 0.08, 1.0)
bsdf_case.inputs["Metallic"].default_value = 0.88
bsdf_case.inputs["Roughness"].default_value = 0.25

# Ceramic Bezel Material
mat_bezel = bpy.data.materials.new(name="Mat_CeramicBezel")
mat_bezel.use_nodes = True
bsdf_bezel = mat_bezel.node_tree.nodes.get("Principled BSDF")
bsdf_bezel.inputs["Base Color"].default_value = (0.03, 0.03, 0.04, 1.0)
bsdf_bezel.inputs["Metallic"].default_value = 0.5
bsdf_bezel.inputs["Roughness"].default_value = 0.15

# Screen Display Face Material (Emissive UI)
mat_screen = bpy.data.materials.new(name="Mat_ScreenUI")
mat_screen.use_nodes = True
nodes_screen = mat_screen.node_tree.nodes
bsdf_screen = nodes_screen.get("Principled BSDF")
bsdf_screen.inputs["Base Color"].default_value = (0.01, 0.01, 0.02, 1.0)
bsdf_screen.inputs["Roughness"].default_value = 0.1
if "Emission Color" in bsdf_screen.inputs:
    bsdf_screen.inputs["Emission Color"].default_value = (0.83, 0.68, 0.21, 1.0) # Gold emissive glow
    bsdf_screen.inputs["Emission Strength"].default_value = 0.4

# Sapphire Glass Material
mat_glass = bpy.data.materials.new(name="Mat_SapphireGlass")
mat_glass.use_nodes = True
bsdf_glass = mat_glass.node_tree.nodes.get("Principled BSDF")
bsdf_glass.inputs["Base Color"].default_value = (0.05, 0.05, 0.06, 1.0)
bsdf_glass.inputs["Roughness"].default_value = 0.05
if "Transmission Weight" in bsdf_glass.inputs:
    bsdf_glass.inputs["Transmission Weight"].default_value = 0.5
if "Coat Weight" in bsdf_glass.inputs:
    bsdf_glass.inputs["Coat Weight"].default_value = 1.0

# Gold Accent Ring Material
mat_gold = bpy.data.materials.new(name="Mat_GoldAccent")
mat_gold.use_nodes = True
bsdf_gold = mat_gold.node_tree.nodes.get("Principled BSDF")
bsdf_gold.inputs["Base Color"].default_value = (0.83, 0.68, 0.21, 1.0)
bsdf_gold.inputs["Metallic"].default_value = 0.95
bsdf_gold.inputs["Roughness"].default_value = 0.2

# Fluoroelastomer Strap Material
mat_strap = bpy.data.materials.new(name="Mat_Strap")
mat_strap.use_nodes = True
bsdf_strap = mat_strap.node_tree.nodes.get("Principled BSDF")
bsdf_strap.inputs["Base Color"].default_value = (0.05, 0.05, 0.06, 1.0)
bsdf_strap.inputs["Roughness"].default_value = 0.75
bsdf_strap.inputs["Metallic"].default_value = 0.05

# Sensor Glass Material
mat_sensor = bpy.data.materials.new(name="Mat_Sensor")
mat_sensor.use_nodes = True
bsdf_sensor = mat_sensor.node_tree.nodes.get("Principled BSDF")
bsdf_sensor.inputs["Base Color"].default_value = (0.02, 0.02, 0.03, 1.0)
bsdf_sensor.inputs["Roughness"].default_value = 0.1
bsdf_sensor.inputs["Metallic"].default_value = 0.2


# ----------------------------------------------------
# 2. MODEL GEOMETRY CREATION
# ----------------------------------------------------

# --- Watch_Case ---
bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0, 0, 0))
watch_case = bpy.context.active_object
watch_case.name = "Watch_Case"
watch_case.scale = (2.2, 2.4, 0.42)
bpy.ops.object.transform_apply(scale=True)
# Bevel modifier for smooth rounded corners
bevel_case = watch_case.modifiers.new(name="Bevel", type='BEVEL')
bevel_case.width = 0.35
bevel_case.segments = 5
bpy.ops.object.modifier_apply(modifier="Bevel")
watch_case.data.materials.append(mat_case)
bpy.ops.object.shade_smooth()

# --- Watch_Bezel ---
bpy.ops.mesh.primitive_cylinder_add(radius=1.0, depth=0.08, vertices=64, location=(0, 0, 0.22))
watch_bezel = bpy.context.active_object
watch_bezel.name = "Watch_Bezel"
watch_bezel.scale = (1.05, 1.15, 1.0)
bpy.ops.object.transform_apply(scale=True)
watch_bezel.data.materials.append(mat_bezel)
bpy.ops.object.shade_smooth()

# --- Watch_Screen ---
bpy.ops.mesh.primitive_cylinder_add(radius=0.96, depth=0.02, vertices=64, location=(0, 0, 0.24))
watch_screen = bpy.context.active_object
watch_screen.name = "Watch_Screen"
watch_screen.scale = (1.05, 1.15, 1.0)
bpy.ops.object.transform_apply(scale=True)
watch_screen.data.materials.append(mat_screen)

# --- Watch_Glass ---
bpy.ops.mesh.primitive_cylinder_add(radius=0.98, depth=0.04, vertices=64, location=(0, 0, 0.26))
watch_glass = bpy.context.active_object
watch_glass.name = "Watch_Glass"
watch_glass.scale = (1.05, 1.15, 1.0)
bpy.ops.object.transform_apply(scale=True)
watch_glass.data.materials.append(mat_glass)

# --- Watch_Crown ---
bpy.ops.mesh.primitive_cylinder_add(radius=0.18, depth=0.35, vertices=32, location=(1.18, 0, 0))
watch_crown = bpy.context.active_object
watch_crown.name = "Watch_Crown"
watch_crown.rotation_euler = (0, math.pi / 2, 0)
bpy.ops.object.transform_apply(rotation=True)
watch_crown.data.materials.append(mat_case)
bpy.ops.object.shade_smooth()

# Crown Gold Ring Accent
bpy.ops.mesh.primitive_cylinder_add(radius=0.15, depth=0.05, vertices=32, location=(1.36, 0, 0))
crown_accent = bpy.context.active_object
crown_accent.name = "Watch_CrownAccent"
crown_accent.rotation_euler = (0, math.pi / 2, 0)
bpy.ops.object.transform_apply(rotation=True)
crown_accent.data.materials.append(mat_gold)

# --- Watch_Button ---
bpy.ops.mesh.primitive_cube_add(size=1.0, location=(1.16, -0.65, 0))
watch_button = bpy.context.active_object
watch_button.name = "Watch_Button"
watch_button.scale = (0.12, 0.45, 0.18)
bpy.ops.object.transform_apply(scale=True)
watch_button.data.materials.append(mat_bezel)
bpy.ops.object.shade_smooth()

# --- Watch_Back & Watch_Sensor ---
bpy.ops.mesh.primitive_cylinder_add(radius=0.85, depth=0.1, vertices=32, location=(0, 0, -0.23))
watch_back = bpy.context.active_object
watch_back.name = "Watch_Back"
watch_back.data.materials.append(mat_case)
bpy.ops.object.shade_smooth()

# Sensor Ring Array
bpy.ops.mesh.primitive_cylinder_add(radius=0.45, depth=0.05, vertices=32, location=(0, 0, -0.27))
watch_sensor = bpy.context.active_object
watch_sensor.name = "Watch_Sensor"
watch_sensor.data.materials.append(mat_sensor)

# Sensor Lenses (4 optical dots)
sensor_offsets = [(0.2, 0.2), (-0.2, 0.2), (0.2, -0.2), (-0.2, -0.2)]
for idx, (ox, oy) in enumerate(sensor_offsets):
    bpy.ops.mesh.primitive_cylinder_add(radius=0.08, depth=0.03, vertices=16, location=(ox, oy, -0.29))
    lens = bpy.context.active_object
    lens.name = f"Watch_SensorLens_{idx+1}"
    lens.data.materials.append(mat_gold)

# --- Watch_Strap_Top ---
bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0, 1.85, 0.05))
strap_top = bpy.context.active_object
strap_top.name = "Watch_Strap_Top"
strap_top.scale = (1.1, 1.4, 0.12)
strap_top.rotation_euler = (math.radians(-12), 0, 0)
bpy.ops.object.transform_apply(scale=True, rotation=True)
bevel_top = strap_top.modifiers.new(name="Bevel", type='BEVEL')
bevel_top.width = 0.05
bevel_top.segments = 3
bpy.ops.object.modifier_apply(modifier="Bevel")
strap_top.data.materials.append(mat_strap)
bpy.ops.object.shade_smooth()

# --- Watch_Strap_Bottom ---
bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0, -1.85, 0.05))
strap_bottom = bpy.context.active_object
strap_bottom.name = "Watch_Strap_Bottom"
strap_bottom.scale = (1.1, 1.4, 0.12)
strap_bottom.rotation_euler = (math.radians(12), 0, 0)
bpy.ops.object.transform_apply(scale=True, rotation=True)
bevel_bottom = strap_bottom.modifiers.new(name="Bevel", type='BEVEL')
bevel_bottom.width = 0.05
bevel_bottom.segments = 3
bpy.ops.object.modifier_apply(modifier="Bevel")
strap_bottom.data.materials.append(mat_strap)
bpy.ops.object.shade_smooth()

# --- Watch_Buckle ---
bpy.ops.mesh.primitive_torus_add(major_radius=0.45, minor_radius=0.05, location=(0, -2.6, 0.2))
buckle = bpy.context.active_object
buckle.name = "Watch_Buckle"
buckle.scale = (1.3, 0.6, 0.8)
bpy.ops.object.transform_apply(scale=True)
buckle.data.materials.append(mat_case)
bpy.ops.object.shade_smooth()


# ----------------------------------------------------
# 3. PARENTING HIERARCHY
# ----------------------------------------------------
# Parent all watch parts under Watch_Case
for obj in bpy.data.objects:
    if obj != watch_case and obj.name.startswith("Watch_"):
        obj.parent = watch_case


# ----------------------------------------------------
# 4. STUDIO LIGHTING & CAMERA FOR PREVIEW
# ----------------------------------------------------
bpy.ops.object.camera_add(location=(0, -4.5, 3.2), rotation=(math.radians(55), 0, 0))
camera = bpy.context.active_object
camera.name = "Studio_Camera"
bpy.context.scene.camera = camera

bpy.ops.object.light_add(type='SUN', location=(5, 5, 8))
sun = bpy.context.active_object
sun.data.energy = 3.5

bpy.ops.object.light_add(type='POINT', location=(-4, -2, 3))
point = bpy.context.active_object
point.data.energy = 50.0


# ----------------------------------------------------
# 5. SAVE BLENDER (.blend) FILE & EXPORT GLB BINARY
# ----------------------------------------------------
import os

output_dir = os.path.abspath("c:/Users/shreyas patil/CHRONOS/public/models")
os.makedirs(output_dir, exist_ok=True)

blend_path = os.path.join(output_dir, "chronos-watch.blend")
glb_path_1 = os.path.join(output_dir, "chronos-watch.glb")
glb_path_2 = os.path.join(output_dir, "smartwatch.glb")

# Save Blend file
bpy.ops.wm.save_as_mainfile(filepath=blend_path)

# Export GLB binary (embed materials & textures)
bpy.ops.export_scene.gltf(
    filepath=glb_path_1,
    export_format='GLB',
    export_apply=True
)

bpy.ops.export_scene.gltf(
    filepath=glb_path_2,
    export_format='GLB',
    export_apply=True
)

print("SUCCESFULLY CREATED CHRONOS SMARTWATCH 3D MODEL:")
print(f" - Blend Source: {blend_path}")
print(f" - GLB Model 1: {glb_path_1}")
print(f" - GLB Model 2: {glb_path_2}")
